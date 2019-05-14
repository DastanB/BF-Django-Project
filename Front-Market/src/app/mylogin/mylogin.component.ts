import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.scss']
})
export class MyloginComponent implements OnInit {

  constructor(private auth_:AuthService) { }
  public username: any = '';
  public password: any = '';

  ngOnInit() {
  }

  login() {
    if(this.username && this.password){
      this.auth_.login(this.username, this.password).then(res => {
        localStorage .setItem('token', res.token);
        localStorage .setItem('name', this.username);
      })
    }
  }

}
