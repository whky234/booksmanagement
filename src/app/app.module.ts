import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InterceptorsService } from './services/interceptors.service';
import { LogginginterceptorsService } from './services/logginginterceptors.service';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { LayoutComponent } from './layout/layout.component';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,


    LoginComponent,
    SingupComponent,
    LayoutComponent,
    HomeComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatError,
    MatInputModule,
    DashboardModule

  ],
  providers: [provideHttpClient(), provideAnimationsAsync(),
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorsService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LogginginterceptorsService,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
