import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myregister',
  templateUrl: './myregister.component.html',
  styleUrls: ['./myregister.component.scss']
})
export class MyregisterComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public email: string = '';

  constructor(private auth_: AuthService , private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth_.register(this.username , this.password , this.email);
    this.router.navigate(['/login']);
  }
}
