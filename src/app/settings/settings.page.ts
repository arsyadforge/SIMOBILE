import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  isDarkMode: boolean = false;

  constructor() { }

  ngOnInit() {
    // Cek status dark mode yang tersimpan di localStorage
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTheme !== null) {
      this.isDarkMode = JSON.parse(savedTheme);
    } else {
      // Jika belum ada pilihan, ikuti preferensi sistem (OS)
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  onToggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    
    // Terapkan class .dark pada document.body
    document.body.classList.toggle('dark', this.isDarkMode);
    
    // Simpan pilihan pengguna ke LocalStorage
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }

}
