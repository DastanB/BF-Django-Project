import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse, IUser } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MainService {
  constructor(http: HttpClient) { 
    super(http)
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('token')!=="undefined";
  }
  isToken(): boolean {
    return !!localStorage.getItem('token');
  }
  login(username: any, password: any): Promise<IAuthResponse>{
    return this.post('http://localhost:8000/api/login/', {
      username: username,
      password: password
    })
  }

  register(username: any, password: any, email: any): Promise<IUser>{
    return this.post('http://localhost:8000/api/register/', {
      username: username,
      password: password,
      email: email
    })
  }
  logout(): void {
    this.post('http://localhost:8000/api/logout/', {}).then(() => {
      localStorage.clear();
    // this.token = ''
    });
  }
}
