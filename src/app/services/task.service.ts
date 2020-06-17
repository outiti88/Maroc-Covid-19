import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  regions = [
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
    "Eddakhla-Oued Eddahab",
    "Souss-Massa"
 ];

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:3000/tasks/";
  apiUrlRegion ="http://localhost:3000/tasks?RegionFr=";

  findAll(){
    return this.http.get<any[]>(this.apiUrl);
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

  findById(id){
    return this.http.get(`${this.apiUrl}/${id}`);

  }

  async findRegion(nom){
    return await this.http.get(`${this.apiUrlRegion}${nom}`).toPromise() ;
  }

  
  
  

}
