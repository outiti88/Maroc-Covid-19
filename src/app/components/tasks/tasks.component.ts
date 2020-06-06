import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  editForm = false;
  showForm = false;
  searchText = '';

  myTask: Task = {
    label: '',
    completed: false
  }

  tasks: Task[] = [];
  resultTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => this.resultTasks = this.tasks = tasks )
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
      label: '',
      completed: false 
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
    this.resultTasks = this.tasks.filter((task)=> task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }



}
