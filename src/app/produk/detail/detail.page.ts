import { Component, OnInit } from '@angular/core';
import { ProdukData } from '../../services/produk-data';

import {
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})


export class DetailPage implements OnInit {

  // ID produk dari URL
  id: string = '';

  // Data produk
  nama: string = '';

  stok: number = 0;

  hargaBeli: number = 0;

  hargaJual: number = 0;

  gambar: string = 'assets/img/def.jpg';


  constructor(
    private route: ActivatedRoute, private produkService: ProdukData
  ) { }


  ngOnInit() {

    // Mengambil ID dari URL
    this.route.params.subscribe(params => {
      this.id = params['id'];

      const product = this.produkService.getProdukById(Number(this.id));

      if (product != null) {
        this.nama = product.nama;
        this.stok = product.stok;
        this.hargaBeli = product.hargaBeli;
        this.hargaJual = product.harga;
        this.gambar = product.gambar;
      }
    });

  }

}