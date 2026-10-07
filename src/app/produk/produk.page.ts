import { Component, OnInit } from '@angular/core';
import { ProdukData } from '../services/produk-data';
import { Keranjang } from '../services/keranjang';
import { AnimationController } from '@ionic/angular/lazy';

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

  constructor(
    private produkService: ProdukData,
    private keranjangService: Keranjang,
    private animationCtrl: AnimationController
  ) { }

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

    this.animasiMasukKeranjang(product.id);

    // stok berkurang langsung di data service, jadi Detail dan Dashboard ikut berubah
    product.stok -= product.jumlah;
    product.jumlah = 0;
  }

  filterProducts() {
    const keyword = this.searchTerm.toLowerCase().trim();

    const filtered = this.products.filter(product =>
      product.nama.toLowerCase().includes(keyword)
    );

    // Memecah hasil filter ke dalam baris grid
    this.productRows = this.chunkArray(filtered, 3);
  }

  animasiMasukKeranjang(p_id: number) {
    const kartu = document.querySelector('#produk-' + p_id) as HTMLElement;

    const animation = this.animationCtrl
      .create()
      .addElement(kartu)
      .duration(500)
      .easing('ease-in-out')
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.1)', opacity: '0.7' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    animation.play();
  }
}