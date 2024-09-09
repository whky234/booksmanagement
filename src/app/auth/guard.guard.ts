import { inject } from '@angular/core';
import { AuthService,  } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const guardGuard: CanActivateFn = (route, state) => {

   const authser=inject(AuthService)
   const router=inject(Router)

 return  authser.user.pipe(map((user)=>{
   if(user){
    return true
   }
   else{

   return router.createUrlTree(['/login'])

   }
 })
)


};
