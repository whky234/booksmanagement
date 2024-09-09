import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../../model/data';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnChanges {
  bookform: FormGroup;

  progressOptions = [
    { value: 'not-started', viewValue: 'Not Started' },
    { value: 'in-progress', viewValue: 'In Progress' },
    { value: 'completed', viewValue: 'Completed' }
  ];
  @Output() emittaskdata: EventEmitter<Data> = new EventEmitter<Data>();
  @Input() task?: Data | null = null;

  constructor(private fb: FormBuilder) {
    this.bookform = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      progress:['',Validators.required]
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.bookform.patchValue(this.task);
    } else {
      this.bookform.reset();
    }
  }

  onsubmit(event: Event) {
    event.preventDefault();
    this.emittaskdata.emit(this.bookform.value);
    console.log('Form submitted:', this.bookform.value);
  }
}
