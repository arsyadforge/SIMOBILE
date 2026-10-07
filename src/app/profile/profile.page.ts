import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// Pastikan path import ini sesuai dengan lokasi folder services kamu
import { Auth } from '../services/auth'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  
  // Variabel untuk menampung data user yang sedang aktif
  userData: any;

  constructor(
    private navCtrl: NavController,
    private authService: Auth // Inject service Auth buatan tim
  ) { }

  ngOnInit() {
    // Tarik data currentUser dari service Auth
    this.userData = this.authService.currentUser;
  }

  prosesLogout() {
    // 1. Panggil fungsi logout di service untuk menghapus sesi (isLoggedIn = false)
    this.authService.logout();
    
    // 2. Lempar kembali ke halaman login
    this.navCtrl.navigateRoot('/login');
  }

}