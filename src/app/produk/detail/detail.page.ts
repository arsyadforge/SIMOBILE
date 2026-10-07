import { Component, OnInit } from '@angular/core';

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
    private route: ActivatedRoute
  ) {}


  ngOnInit() {

    // Mengambil ID dari URL
    this.route.params.subscribe(params => {

      this.id = params['id'];


      // Mengambil data produk dari localStorage
      const savedProducts =
        localStorage.getItem('products');


      // Jika data tersedia
      if (savedProducts) {

        const products =
          JSON.parse(savedProducts);


        // Mencari produk berdasarkan ID
        const product = products.find(
          (p: any) =>
            p.id === Number(this.id)
        );


        // Jika produk ditemukan
        if (product) {

          // Menampilkan nama produk
          this.nama = product.nama;

          // Menampilkan stok
          this.stok = product.stok;

          // Menampilkan harga beli
          this.hargaBeli = product.harga;

          // Menampilkan harga jual
          this.hargaJual = product.hargaJual;

          // Menampilkan gambar
          this.gambar = product.gambar;

        }

      }

    });

  }

}