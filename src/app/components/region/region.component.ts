import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  id: number = 0;
  obj : any = {};

  myTask: any = {
    RegionFr: "Tapez la Région",
    Cases: 0,
    Deaths: 0,
    Recoveries: 0,
    date: 0
  }
  tasks: Task ;
  resultTasks: any[] = [];
  results:  any[] = [];


  constructor(private taskService: TaskService ,private route: ActivatedRoute) {

   }

  async ngOnInit() {
    this.id= this.route.snapshot.params['id'];

    this.getTasks();

  }



  getTasks(){
    this.taskService.findAll()
    .subscribe((tasks) => {
      this.resultTasks  = tasks;

    } );

    this.taskService.findById(this.id)
    .subscribe((task) => {
      this.myTask = task;
      this.results  = this.resultTasks.filter((task)=> task.RegionFr.includes(this.myTask.RegionFr));
      console.log(this.results);


    } );

  }

   affiche(){
    this.results  = this.resultTasks.filter((task)=> task.RegionFr.includes(this.myTask.RegionFr));

   }

  
}
