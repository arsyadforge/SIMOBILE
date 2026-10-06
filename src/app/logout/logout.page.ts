import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  standalone: false,
})
export class LogoutPage implements OnInit {

  constructor(private authservice: Auth, private router: Router) { }

  ngOnInit() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
