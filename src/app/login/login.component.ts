import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Auth } from '../model/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
islogging:boolean=true;
isloading:boolean=false

authobs!:Observable<Auth>
constructor(private authser:AuthService,private snack:MatSnackBar,private router:Router){

}
switch(){
  this.islogging=!this.islogging
}


onsubmitted(form:NgForm){
  console.log(form.value)


  const email=form.value.email
  const password=form.value.password

  if(this.islogging){
    this.isloading=true

  this.authobs=  this.authser.Login(email,password)
  }
  else{
    this.isloading=true
 this.authobs=  this.authser.singup(email,password)
  }

  this.authobs.subscribe({next:(res)=>{
    console.log(res)
    this.isloading=false
    this.router.navigate(['/dashboard/over'])
   },error:(error)=>{
    this.snack.open(error,'close',{
      duration:5000

    })
    this.isloading=false
   }})
  form.reset()
}
}
