import { Data } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  task:Data[]=[]
  inprogress:number=0;
  notstart:number=0;
  completed:number=0
  total:number=0

  constructor(private CrudService:CrudService ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.CrudService.getall().subscribe((tasklist:Data[])=>{
      this.task=tasklist;
      this.total=tasklist.length;
      this.completed=tasklist.filter(x=>x['progress']==='completed').length;
      this.notstart=tasklist.filter(x=>x['progress']==='not-started').length;
      this.inprogress=tasklist.filter(x=>x['progress']==='in-progress').length;



    })
  }


}
