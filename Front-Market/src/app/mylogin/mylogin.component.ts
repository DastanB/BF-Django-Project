import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import { Location } from '@angular/common';
import { isRegExp } from 'util';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.scss']
})
export class MyloginComponent implements OnInit {

  constructor(private auth_:AuthService , private router: Router , private location: Location) { }
  public username: any = '';
  public password: any = '';

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/']);;
    }
  }

  login() {
    if(this.username && this.password){
      this.auth_.login(this.username, this.password).then(res => {
        localStorage .setItem('token', res.token);
        localStorage .setItem('name', this.username);
        if(res.token) {
          location.reload();
        }
      })
    }
  }

}
