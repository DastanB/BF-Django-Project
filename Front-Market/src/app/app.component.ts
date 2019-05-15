import { Component } from '@angular/core';
import { ProviderService } from './services/provider.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wingman-ng';
  isLoggedIn = true;

  constructor(private provider: ProviderService , private auth_: AuthService , private router: Router){

  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.isLoggedIn = true;
      console.log(localStorage.getItem('token'));
    }
    else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.auth_.logout();
    this.router.navigate(['/']);
  }
}
