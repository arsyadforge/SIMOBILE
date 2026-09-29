import { Component } from '@angular/core';
import { MenuController, createAnimation } from '@ionic/angular/lazy';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private menuCtrl: MenuController) {
    this.menuCtrl.registerAnimation('overlay', (menu: any) => {
      const closedX = menu.isEndSide ? menu.width + 8 : -(menu.width + 8);

      // Same slide + backdrop as Ionic's default "overlay" menu
      const slide = createAnimation()
        .addElement(menu.menuInnerEl)
        .fromTo('transform', `translateX(${closedX}px)`, 'translateX(0px)');

      const backdrop = createAnimation()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);

      // Outer ring clockwise, inner ring counter-clockwise
      const spin1 = createAnimation()
        .addElement(menu.el.querySelector('#donut-spinner1'))
        .fromTo('transform', 'rotate(0deg)', 'rotate(-360deg)');

      const spin2 = createAnimation()
        .addElement(menu.el.querySelector('#donut-spinner2'))
        .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');

      return createAnimation()
        .easing('cubic-bezier(0.32, 0.72, 0, 1)')
        .duration(400)
        .addAnimation([slide, backdrop, spin1, spin2]);
    });
  }
}
