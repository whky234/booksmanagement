import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { guardGuard } from './auth/guard.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './stats/stats.component';
import { OverviewComponent } from './dashboard/overview/overview.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/home',pathMatch:'full'
  },


{
 path:'',component:LayoutComponent,children:[
{
  path:'home',component:HomeComponent
},
  {
    path:'dashboard',component:DashboardComponent,canActivate:[guardGuard],
    children:[
      {
        path:'over',component:OverviewComponent
      }
      ,{
        path:'stat',component:StatsComponent
      }
    ]
  }
  ,
  {
    path:'login',component:LoginComponent
  }
 ]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
