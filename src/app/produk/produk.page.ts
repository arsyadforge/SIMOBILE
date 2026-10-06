import { Component, OnInit } from '@angular/core';
import { ProdukData } from '../services/produk-data';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {

  products: any[] = [];
  productRows: any[][] = [];

  kataCari: string = '';

  constructor(private produkData: ProdukData) {}

  ngOnInit() {
    this.products = this.produkData.getSemuaProduk();
    this.productRows = this.chunkArray(this.products, 3);
  }

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

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  }

}