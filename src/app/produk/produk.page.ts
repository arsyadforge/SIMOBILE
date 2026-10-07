import { Component, OnInit } from '@angular/core';
import { ProdukData } from '../services/produk-data';
import { Keranjang } from '../services/keranjang';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  products: any[] = [];
  productRows: any[][] = [];

  constructor(private produkService: ProdukData, private keranjangService: Keranjang) { }

  ngOnInit() {
    this.muatProduk();
  }

  // Muat ulang setiap halaman dibuka, supaya hasil Tambah/Edit Produk ikut terbaca
  ionViewWillEnter() {
    this.muatProduk();
  }

  muatProduk() {
    this.products = this.produkService.getSemuaProduk();
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].jumlah === undefined) {
        this.products[i].jumlah = 0;
      }
    }
    this.productRows = this.chunkArray(this.products, 3);
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  tambahJumlah(product: any) {
    if (product.jumlah < product.stok) {
      product.jumlah++;
    }
  }

  kurangJumlah(product: any) {
    if (product.jumlah > 0) {
      product.jumlah--;
    }
  }

  simpanKeKeranjang(product: any) {
    if (product.jumlah <= 0) {
      alert('Jumlah produk harus lebih dari 0.');
      return;
    }

    // harga yang dikirim = harga jual
    this.keranjangService.tambahItem(product.id, product.nama, product.jumlah, product.harga);

    // stok berkurang langsung di data service, jadi Detail dan Dashboard ikut berubah
    product.stok -= product.jumlah;
    product.jumlah = 0;

    alert('Produk berhasil ditambahkan ke keranjang!');
  }
}