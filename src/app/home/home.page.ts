import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  taskList: Task[] = [];
  CompletedtaskList: Task[] = [];
  IncompletedtaskList: Task[] = [];
  constructor(private dialogService: DialogService, private TaskService: TaskService) { }
  ngOnInit(): void {
    this.LoadTasks();
  }
  LoadTasks() {
    this.TaskService.getTasks().subscribe((list) => {
      this.taskList = [];
      this.taskList.push(...list);
  
      this.CompletedtaskList = this.taskList.filter((task) => task.completed);
      this.IncompletedtaskList = this.taskList.filter((task) => !task.completed);
    });
  }
  prompt() {
    this.dialogService.showPrompt('Hello', 'Task Title').subscribe((response) => {
      if (response !== undefined && response.trim() !== '') {
        const newTask: Task = {
          taskId: 0,
          title: response,
          completed: false,
        };
        this.addTask(newTask);
      }
    });
  }

  addTask(task: Task) {
    this.TaskService.addTask(task).subscribe(() => {
      this.LoadTasks();
    });
  }
  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    if (task.completed) {
      this.IncompletedtaskList = this.IncompletedtaskList.filter((t) => t.taskId !== task.taskId);
      this.CompletedtaskList.push(task);
    } else {
      this.CompletedtaskList = this.CompletedtaskList.filter((t) => t.taskId !== task.taskId);
      this.IncompletedtaskList.push(task);
    }
    this.TaskService.updateTask(task).subscribe(() => {
      alert("Task updated successfully");
    });
  }
  deleteTask(task: Task) {
    this.TaskService.deleteTask(task).subscribe(() => {
      this.taskList = this.taskList.filter((t) => t.taskId !== task.taskId);
      alert("Task deleted successfully");
      this.LoadTasks();
    });
  }


}




  