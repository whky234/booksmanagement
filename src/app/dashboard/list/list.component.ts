import { Component } from '@angular/core';
import { Data } from '../../model/data';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from '../../services/crud.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  data: Data[] = [];
  currentTask: Data | null = null;
  isloading: boolean = false;
  errsub: Subscription[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private crudser: CrudService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.getAllTasks();
      } else {
        this.data = [];
        this.isloading = false; // Stop loading if user is not authenticated
      }
    });

  }

  ngOnDestroy(): void {
    this.errsub.forEach(sub => sub.unsubscribe());
  }

  create(task: Data) {
    if (this.currentTask) {
      this.updateTask(task);
    } else {
      this.isloading = true;
      const createsub = this.crudser.create(task).subscribe({
        next: (res) => {
          console.log('Task created:', res);
          this.getAllTasks();
          this.currentTask = null;
          this.isloading = false;
        },
        error: (error) => {
          this.handleError(error);
        }
      });
      this.errsub.push(createsub);
    }
  }

  updateTask(task: Data) {
    if (!this.currentTask) return;

    task.id = this.currentTask.id;
    this.isloading = true;
    const updatesub = this.crudser.update(task).subscribe({
      next: (res) => {
        console.log('Task updated:', res);
        this.getAllTasks();
        this.currentTask = null;
        this.isloading = false;
      },
      error: (error) => {
        this.handleError(error);
      }
    });
    this.errsub.push(updatesub);
  }

  deleteTask(taskId: string) {
    this.isloading = true;
    const delsub = this.crudser.delete(taskId).subscribe({
      next: (res) => {
        console.log('Task deleted:', res);
        this.getAllTasks();
        this.isloading = false;
      },
      error: (error) => {
        this.handleError(error);
      }
    });
    this.errsub.push(delsub);
  }

  getAllTasks() {
    this.isloading = true;
    const getallsub = this.crudser.getall().subscribe({
      next: (res: Data[]) => {
        this.data = res;
        this.isloading = false;
      },
      error: (error) => {
        this.handleError(error);
        this.data = []; // Clear data on error to show "No task created"
      }
    });
    this.errsub.push(getallsub);
  }


  private handleError(error: HttpErrorResponse) {
    this.isloading = false;
    this.crudser.handleres(error);
  }
}
