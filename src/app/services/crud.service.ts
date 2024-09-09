import { Data } from './../model/data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError,  map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient,private snackbar:MatSnackBar,
    private authser:AuthService

  ) {

   }

   create(task:Data): Observable<Data>{
   return this.http
    .post<Data>(
      'https://angulartask-c356b-default-rtdb.firebaseio.com/task.json',
      task
    ).pipe(catchError((err)=>
      this.handleres(err)
    ))
   }

   getall(): Observable<Data[]> {
    return this.http.get(
      'https://angulartask-c356b-default-rtdb.firebaseio.com/task.json').pipe(

      map((res:any) => {
        const tasks: Data[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const task = { ...res[key], id: key }; // Add id after spreading the rest
            tasks.push(task);
          }
        }
        return tasks;
      }),
      catchError((err) => this.handleres(err))
    );
  }



   getbyid(taskId:string): Observable<Data>{
   return this.http
    .get<Data>(`https://your-firebase-url/task/${taskId}.json`)
    .pipe(catchError((err)=>
      this.handleres(err)
    ))
   }

   update(task: Data): Observable<Data> {
    if (!task.id) {
      console.error('Task ID is missing');
      return throwError(() => new Error('Task ID is required for updating'));
    }
    return this.http
      .put<Data>(`https://angulartask-c356b-default-rtdb.firebaseio.com/task/${task.id}.json`, task)
      .pipe(catchError((error) => this.handleres(error)));
  }



   delete(taskId:string): Observable<void>{
    return   this.http
    .delete<void>(
      `https://angulartask-c356b-default-rtdb.firebaseio.com/task/${taskId}.json`
    )
    .pipe(catchError((err)=>
      this.handleres(err)
    ))
   }



  public handleres(err:HttpErrorResponse): Observable<never>{
    console.log(err)
    if(err.error.error==='Permission denied'){
      this.snackbar.open('you have not permission to perform this action','close',{
        duration:5000
      })
    }

  else if(err.status===404){
      this.snackbar.open('Resource not found. Please check the request URL.','close',{
        duration:5000
      })
    }

    else {
      this.snackbar.open('An unexpected error occurred. Please try again later.', 'Close', {
        duration: 5000,
      });
    }



    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
