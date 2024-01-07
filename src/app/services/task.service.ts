import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  Url = "http://localhost:5216/Task";

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.Url, task);
  }
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.Url)
  }
  updateTask(task: Task): Observable<Task>{
    return this.http.put<Task>(this.Url, task);
  }
  deleteTask(task: Task): Observable<Task>{
    return this.http.delete<Task>(this.Url + "/" + task.taskId);
  }
}


 