import { Component } from '@angular/core';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage {

  // Menyimpan data produk dalam keranjang
  keranjang: any[] = [];

  constructor() {}


  // Dipanggil ketika halaman keranjang dibuka
  ionViewWillEnter() {

    const data = localStorage.getItem('keranjang');

    if (data) {

      this.keranjang = JSON.parse(data);

    } else {

      this.keranjang = [];

    }

  }

}