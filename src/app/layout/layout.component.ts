import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  authser=inject(AuthService)

  islogging:boolean=false
  private usersubject!:Subscription

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

   this.usersubject= this.authser.user.subscribe((user)=>{
    console.log(user)
      this.islogging=user?true:false
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.usersubject.unsubscribe()
  }

    logout(){
      this.authser.Logout()
    }
}
