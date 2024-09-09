import { AuthService } from './auth.service';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {

  AuthService=inject(AuthService)
  intercept(req: HttpRequest<any>, next: HttpHandler) {


    return this.AuthService.user.pipe(take(1),exhaustMap(user => {
      if(!user){
        return next.handle(req)
      }

      const modifiedreq=req.clone({
        params:new HttpParams().set('auth',user.tokens!)
      })
      return next.handle(modifiedreq)
    })


    )
    // console.log("auth interceptor called")

    // const modified=req.clone()
    // return next.handle(modified).pipe(tap((event)=>{
    // if(event.type===HttpEventType.Response){
    //   console.log('response has arrives','response data is')
    //   console.log(event.body)
    // }
    // }))
  }
}
