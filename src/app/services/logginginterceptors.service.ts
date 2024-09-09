import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogginginterceptorsService implements HttpInterceptor{

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  console.log('logging interceptors')
  console.log('request url',req.url )

  return next.handle(req)
}
}
