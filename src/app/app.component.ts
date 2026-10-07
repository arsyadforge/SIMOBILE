import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular/lazy';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isDark: boolean = false;

  constructor(public authservice: Auth, private animationCtrl: AnimationController) { }

  gantiTema() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('ion-palette-dark', this.isDark);
    document.body.classList.toggle('dark', this.isDark);
  }

  //Animasi di Drawer
  spinDonut() {
    const spinner1 = document.querySelector('#donut-spinner1') as HTMLElement;
    const spinner2 = document.querySelector('#donut-spinner2') as HTMLElement;

    // lingkaran luar: searah jarum jam
    const animation1 = this.animationCtrl
      .create()
      .addElement(spinner1)
      .duration(1000)
      .easing('ease-out')
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(360deg)' },
      ]);

    // lingkaran dalam: berlawanan jarum jam
    const animation2 = this.animationCtrl
      .create()
      .addElement(spinner2)
      .duration(1000)
      .easing('ease-out')
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(-360deg)' },
      ]);

    animation1.play();
    animation2.play();
  }
}
