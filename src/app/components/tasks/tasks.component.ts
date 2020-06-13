import { Component, OnInit,Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import {ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() id: number;


  editForm = false;
  showForm = false;
  searchText = '';
  searchDates = 5;

  constructor(private taskService: TaskService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.getTasks();
  }
  myTask: Task = {
    RegionFr: "Tapez la Région",
    Cases: 0,
    Deaths: 0,
    Recoveries: 0,
    date: 0
  }

  tasks: any[] = [];
  resultTasks: any[] = [];


  

  getTasks(){
    this.taskService.findAll()
    .subscribe((tasks) => {
      this.resultTasks = this.tasks = tasks;
    } )
  }

  affiche(){
    return this.tasks;
  }

  deleteTask(id){
    this.taskService.delete(id)
    .subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id)
    })
  }

  persistTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task)=> {
      this.tasks = [task, ...this.tasks];
      this.resetTask();
      this.showForm = false;

    })
  }

  resetTask(){
    this.myTask = {
      RegionFr: "string",
    Cases: 0,
    Deaths: 0,
    Recoveries: 0,
    date:0
    }
  }

  toggle(task){
    this.taskService.completed(task.id,task.completed)
    .subscribe(()=>{
      task.completed = !task.completed
    })
  }

  edit(task){
    this.myTask = task;
    this.editForm = true;
    this.showForm = true;


  }
  updateForm(){
    this.taskService.update(this.myTask)
    .subscribe(task => {
      this.resetTask();
      this.editForm = false;
      this.showForm = false;
    })
  }

  showForme(){
    this.showForm = !this.showForm;
    this. resetTask();
    this.editForm = false;

  }

  searchTasks(){
    if (this.searchText.length>0){
      this.tasks = this.tasks.filter((task)=> task.RegionFr.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    else {
      this.taskService.findAll()
      .subscribe((tasks) => {
        this.resultTasks = this.tasks = tasks;
      } )
    }
   
  }

  getTotal(d : number){
    let total = 0;
    for (let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].date == d){
        total += +this.tasks[i].Cases;
        console.log(total);
      }
      
    }
    
    return total;
  }

  searchDate(){
    return this.searchDates ;
  }



}
