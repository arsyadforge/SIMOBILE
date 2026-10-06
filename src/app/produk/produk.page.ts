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

  searchTerm: string = '';

  constructor(private produkData: ProdukData) {}

  ngOnInit() {
    this.products = this.produkData.getSemuaProduk();
    this.productRows = this.chunkArray(this.products, 3);
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  }

  filterProducts() {
    const keyword = this.searchTerm.toLowerCase().trim();

    const filtered = this.products.filter(product =>
      product.nama.toLowerCase().includes(keyword)
    );

    this.productRows = this.chunkArray(filtered, 3);
  }
}