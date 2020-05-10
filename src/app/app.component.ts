import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctor-appointment-frontend';

  constructor(
    private authenticateService: AuthenticationService,
    private router: Router) { }

  userLogged() {
    return JSON.parse(localStorage.getItem('user')) ? true : false;
  }

  logout() {
    this.authenticateService.logOut();
    this.router.navigate(['/sign']);
  }
}
