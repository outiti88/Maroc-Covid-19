import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:5000/tasks";

  findAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persist(task){
    return this.http.post<Task>(this.apiUrl, task);
  }

  completed(id, completed){
    return this.http.patch(`${this.apiUrl}/${id}`,{completed : !completed});
  }

  update(task){
    return this.http.put(`${this.apiUrl}/${task.id}`,task);
  }

}
