import { Component, OnInit,Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import {ActivatedRoute } from '@angular/router';
import { DatePipe  } from "@angular/common";



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [DatePipe],
})
export class TasksComponent implements OnInit {

  editForm = false;
  showForm = false;
  searchText = '';
  searchDates : any = new Date();
  regions = [
     "Eddakhla-Oued Eddahab",
     "Guelmim-Oued Noun",
     "Laayoune-Sakia El Hamra",
     "Marrakech-Safi",
     "Rabat-Salé-Kénitra",
     "Casablanca-Settat",
     "Fés-Meknés",
     "Tanger-Tétouan-Al Hoceima",
     "Beni Mellal-Khénifra",
     "Drâa-Tafilalet",
     "Oriental",
     "Souss-Massa"
     
  ];
 selectedValue = null;


  constructor(private taskService: TaskService ,private route: ActivatedRoute, private datePipe: DatePipe) {
    this.searchDates = this.datePipe.transform(this.searchDates, 'yyyy-MM-dd');

   }



  ngOnInit(): void {

    this.getTasks();
  

  }
  myTask: Task = {
    RegionFr: "Tapez la Région",
    Cases: 0,
    Deaths: 0,
    Recoveries: 0,
    date: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  tasks: any[] = [];
  resultTasks: any[] = [];


  

  getTasks(){
    this.taskService.findAll()
    .subscribe((tasks) => {
      this.resultTasks = this.tasks = tasks;
    } );
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
      RegionFr: "Tapez la Région",
    Cases: 0,
    Deaths: 0,
    Recoveries: 0,
    date: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    }
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

  /*RegionForDate(){
    regionsDate : ["salut"];
      
    return regionsDate;
  }*/

  getTotal(d : number){
    let total = 0;
    for (let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].date == d){
        total += +this.tasks[i].Cases;
        console.log(total);
      }
   
    }
    console.log('saaalut',this.tasks);
    console.log('caaavaa',this.resultTasks);
    return total;
  }

  searchDate(){
    return this.searchDates ;
  }



}
