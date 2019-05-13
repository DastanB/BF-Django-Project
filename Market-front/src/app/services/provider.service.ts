import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {TaskList, Task, IAuthResponse, IUser} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getCategories(): Promise<TaskList[]> {
    return this.get('http://localhost:8000/api/cbv/task_lists/', {});
  }

  getProducts(list: TaskList): Promise<Task[]> {
    return this.get(`http://localhost:8000/api/task_lists/${list.id}/tasks/`, {});
  }
  getDetailedProducts(list: number): Promise<Task> {
    return this.get(`http://localhost:8000/api/task/${list}`, {});
  }
  createTaskList(name: any,owner : IUser): Promise<TaskList> {
    return this.post('http://localhost:8000/api/cbv/task_lists/create/', {
      name: name,
      owner: owner
    });
  }
  
  updateTaskList(list: TaskList): Promise<TaskList> {
    return this.put(`http://localhost:8000/api/cbv/task_lists/${list.id}/`, {
      name: list.name
    });
  }
  deleteTaskList(id: number): Promise<any> {
    return this.delete(`http://localhost:8000/api/cbv/task_lists/${id}/`, {});
  }

  createTask(name: any,due_on:any,status:any,list:number): Promise<Task> {
    return this.post(`http://localhost:8000/api/cbv/task_lists/${list}/tasks/create/`, {
      name: name,
      due_on:due_on,
      status:status
    });
  }
  updateTask(task: Task) : Promise<Task>{
    return this.put(`http://localhost:8000/api/task/${task.id}/`, {
      name: task.name,
      created_at: task.created_at,
      due_on: task.due_on,
      status: task.status
    })
  }

  deleteTask(id: number) : Promise<any>{
    return this.delete(`http://localhost:8000/api/task/${id}/`, {})
  }

  
}