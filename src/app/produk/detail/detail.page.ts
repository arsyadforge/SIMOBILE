import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {

  id: string = '';

  stok: number = 0;
  hargaBeli: number = 0;
  hargaJual: number = 0;
  gambar: string = 'assets/Gambar/Default.jpg';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.id = params['id'];

      if (this.id == '1') {
        this.stok = 10;
        this.hargaBeli = 20000;
        this.hargaJual = 25000;
      }

      if (this.id == '2') {
        this.stok = 15;
        this.hargaBeli = 30000;
        this.hargaJual = 35000;
      }

      if (this.id == '3') {
        this.stok = 20;
        this.hargaBeli = 40000;
        this.hargaJual = 45000;
      }

      if (this.id == '4') {
        this.stok = 30;
        this.hargaBeli = 3000;
        this.hargaJual = 3500;
      }

      if (this.id == '5') {
        this.stok = 12;
        this.hargaBeli = 8000;
        this.hargaJual = 10000;
      }

      if (this.id == '6') {
        this.stok = 10;
        this.hargaBeli = 12000;
        this.hargaJual = 15000;
      }

      if (this.id == '7') {
        this.stok = 0;
        this.hargaBeli = 0;
        this.hargaJual = 0;
        this.gambar = 'assets/img/default.jpg';
      }

      if (this.id == '8') {
        this.stok = 0;
        this.hargaBeli = 0;
        this.hargaJual = 0;
        this.gambar = 'assets/img/default.jpg';
      }

    });

  }

}