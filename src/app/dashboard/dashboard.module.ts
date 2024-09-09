import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { OverviewComponent } from './overview/overview.component';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { StatsComponent } from '../stats/stats.component';
import { guardGuard } from '../auth/guard.guard';


@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    TaskComponent,
    OverviewComponent,
    StatsComponent
  ],
  exports:[
    DashboardComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatLabel,
    MatButtonModule,
    MatError,
    MatInputModule,
   MatSelectModule

  ]
})
export class DashboardModule { }
