import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdukData {
  products = [
    { id: 1, nama: 'Beras', kategori: 'Sembako', stok: 10, hargaBeli: 17000, harga: 20000, gambar: 'assets/img/beras.jpg', terjual: 14 },
    { id: 2, nama: 'Minyak', kategori: 'Sembako', stok: 15, hargaBeli: 15500, harga: 18000, gambar: 'assets/img/minyak.jpg', terjual: 32 },
    { id: 3, nama: 'Gula', kategori: 'Sembako', stok: 20, hargaBeli: 14500, harga: 17000, gambar: 'assets/img/gula.jpg', terjual: 21 },
    { id: 4, nama: 'Mie', kategori: 'Makanan Instan', stok: 30, hargaBeli: 2800, harga: 3500, gambar: 'assets/img/mie.jpg', terjual: 63 },
    { id: 5, nama: 'Teh', kategori: 'Minuman', stok: 12, hargaBeli: 6500, harga: 8000, gambar: 'assets/img/teh.jpg', terjual: 18 },
    { id: 6, nama: 'Kopi', kategori: 'Minuman', stok: 10, hargaBeli: 10000, harga: 12000, gambar: 'assets/img/kopi.jpg', terjual: 25 },
    { id: 7, nama: 'Tepung', kategori: 'Sembako', stok: 0, hargaBeli: 10000, harga: 12000, gambar: 'assets/img/def.jpg', terjual: 9 },
    { id: 8, nama: 'Jajan', kategori: 'Snack', stok: 0, hargaBeli: 3500, harga: 5000, gambar: 'assets/img/def.jpg', terjual: 11 },
    { id: 9, nama: 'Telur', kategori: 'Sembako', stok: 18, hargaBeli: 26000, harga: 30000, gambar: 'assets/img/def.jpg', terjual: 16 },
    { id: 10, nama: 'Sabun', kategori: 'Kebersihan', stok: 30, hargaBeli: 3000, harga: 4500, gambar: 'assets/img/def.jpg', terjual: 7 },
  ];

  getSemuaProduk(): any[] {
    return this.products;
  }

  getProdukById(id: number): any {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) return this.products[i];
    }
    return null;
  }

  getJumlahProduk(): number {
    return this.products.length;
  }

  getProdukTerlaris(): any {
    let terlaris = this.products[0];
    for (let i = 1; i < this.products.length; i++) {
      if (this.products[i].terjual > terlaris.terjual) {
        terlaris = this.products[i];
      }
    }
    return terlaris;
  }

  tambahProduk(p_nama: string, p_stok: number, p_hargaBeli: number, p_harga: number, p_gambar: string) {
    let idBaru = 1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id >= idBaru) {
        idBaru = this.products[i].id + 1;
      }
    }
    this.products.push({
      id: idBaru, nama: p_nama, kategori: 'Lainnya', stok: p_stok,
      hargaBeli: p_hargaBeli, harga: p_harga, gambar: p_gambar, terjual: 0
    });
  }

  ubahProduk(p_id: number, p_nama: string, p_stok: number, p_hargaBeli: number, p_harga: number) {
    const produk = this.getProdukById(p_id);
    if (produk != null) {
      produk.nama = p_nama;
      produk.stok = p_stok;
      produk.hargaBeli = p_hargaBeli;
      produk.harga = p_harga;
    }
  }

  tambahTerjual(p_id: number, p_jumlah: number) {
    const produk = this.getProdukById(p_id);
    if (produk != null) {
      produk.terjual += p_jumlah;
    }
  }
}