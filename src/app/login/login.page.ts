import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authservice: Auth, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    if (this.authservice.login(this.username, this.password)) {
      this.errorMessage = '';
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Username atau password salah';
    }
  }
}
