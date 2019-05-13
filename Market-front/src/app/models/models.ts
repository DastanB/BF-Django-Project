    
export interface TaskList {
    id: number;
    name: string;
    owner :IUser;
  }
  
  export interface Task {
    id: number;
    name: string;
    created_at:string;
    due_on:string;
    status:string;
    task_list:TaskList;
    owner :IUser;
  }

export interface IAuthResponse {
    token: string;
  }
export interface IUser {
    username: string,
    password: string,
    email: string
  }