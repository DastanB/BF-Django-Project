import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth_:AuthService) { }
  public username: any='';
  public password: any='';
  public email: any='';
  public registration:boolean = false;
  ngOnInit() {
  }
  login(){
    if (this.username != '' && this.password != ''){
      this.auth_.login(this.username, this.password).then(res => {
        localStorage .setItem('token', res.token);
        localStorage .setItem('name', this.username);
        this.registration = false;
      })
    }
  }
  
}
