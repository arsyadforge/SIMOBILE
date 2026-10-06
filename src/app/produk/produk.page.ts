import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {

  products = [
    {
      id: 1,
      nama: 'Beras',
      stok: 10,
      harga: 20000,
      gambar: 'assets/img/beras.jpg'
    },
    {
      id: 2,
      nama: 'Minyak',
      stok: 15,
      harga: 18000,
      gambar: 'assets/img/minyak.jpg'
    },
    {
      id: 3,
      nama: 'Gula',
      stok: 20,
      harga: 17000,
      gambar: 'assets/img/gula.jpg'
    },
    {
      id: 4,
      nama: 'Mie',
      stok: 30,
      harga: 3500,
      gambar: 'assets/img/mie.jpg'
    },
    {
      id: 5,
      nama: 'Teh',
      stok: 12,
      harga: 8000,
      gambar: 'assets/img/teh.jpg'
    },
    {
      id: 6,
      nama: 'Kopi',
      stok: 10,
      harga: 12000,
      gambar: 'assets/img/kopi.jpg'
    },
    {
      id: 7,
      nama: 'Tepung',
      stok: 0,
      harga: 0,
      gambar: 'assets/img/def.jpg'
    },
    {
      id: 8,
      nama: 'Jajan',
      stok: 0,
      harga: 0,
      gambar: 'assets/img/def.jpg'
    }
  ];

  productRows: any[][] = [];

    kataCari: string = '';

  cari() {
    const kata = this.kataCari.toLowerCase().trim();
    const hasil: any[] = [];

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].nama.toLowerCase().includes(kata)) {
        hasil.push(this.products[i]);
      }
    }

    this.productRows = this.chunkArray(hasil, 3);
  }

  constructor() {}

  ngOnInit() {
    this.productRows = this.chunkArray(this.products, 3);
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {

    const result = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  }

}