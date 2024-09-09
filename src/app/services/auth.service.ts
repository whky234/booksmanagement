import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../model/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError, tap, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new BehaviorSubject<User | null>(null); // Initialize with null
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  singup(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<Auth>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPT0gNIl4DW8BdNZw-QrQOUi1gRH7ryyU',
        data
      )
      .pipe(
        catchError(this.handlieerrors),
        tap((res) => {
          this.handlecreateuser(res);
        })
      );
  }

  Login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<Auth>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPT0gNIl4DW8BdNZw-QrQOUi1gRH7ryyU',
        data
      )
      .pipe(
        catchError(this.handlieerrors),
        tap((res) => {
          this.handlecreateuser(res);
        })
      );
  }

  Logout(){
    this.user.next(null)
    this.router.navigate(['/login'])
    localStorage.removeItem('user')
  }

  AutoLogin() {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    // Since userData is a string at this point, safely parse it to an object
    const parsedUser = JSON.parse(userData);

    // Ensure parsedUser has the expected structure before using it
    if (parsedUser && parsedUser.email && parsedUser.id && parsedUser.token && parsedUser.expirein) {
      const loggedUser = new User(parsedUser.email, parsedUser.id, parsedUser.token, new Date(parsedUser.expirein));

      // Emit the loggedUser using the BehaviorSubject
      this.user.next(loggedUser);
    }
  }


  private handlecreateuser(res: any) {
    const expiresints = new Date().getTime() + +res.expiresIn * 1000;
    const expires = new Date(expiresints);
    const user = new User(res.email, res.localId, res.idToken, expires);
    this.user.next(user);

    localStorage.setItem('user',JSON.stringify(user))

  }

  private handlieerrors(err: HttpErrorResponse) {
    let errormessage = 'An unknown error has occured';
    console.log(err);
    if (!err.error || !err.error.error) {
      return throwError(() => {
        errormessage;
      });
    }

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errormessage = 'Email Already Exits';
        break;

      case 'OPERATION_NOT_ALLOWED':
        errormessage = 'Password sign-in is disabled for this project';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errormessage = 'Invalid Email Or Password';
        break;
    }

    return throwError(() => errormessage);
  }



}
