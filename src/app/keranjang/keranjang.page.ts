import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../services/transaksi';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false
})
export class KeranjangPage implements OnInit {
  // Array statis agar data dari halaman produk bisa masuk ke halaman keranjang
  static keranjangGlobal: any[] = [];

  items: any[] = [];

  constructor(private transaksiService: Transaksi) { }

  ngOnInit() {
    this.muatKeranjang();
  }

  // Update setiap kali halaman keranjang dibuka
  ionViewWillEnter() {
    this.muatKeranjang();
  }

  muatKeranjang() {
    this.items = KeranjangPage.keranjangGlobal;
  }

  // Dipanggil dari halaman produk
  static tambahProduk(produk: { id: number; nama: string; jumlah: number; harga: number }) {
    const ada = KeranjangPage.keranjangGlobal.find(item => item.id === produk.id);
    if (ada) {
      ada.jumlah += produk.jumlah;
    } else {
      KeranjangPage.keranjangGlobal.push({ ...produk });
    }
  }

  get totalHarga(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += (this.items[i].harga * this.items[i].jumlah);
    }
    return total;
  }

  prosesCheckout() {
    if (this.items.length === 0) {
      alert('Keranjang belanja Anda masih kosong.');
      return;
    }

    const itemTransaksi = this.items.map(item => ({
      nama: item.nama,
      jumlah: item.jumlah,
      harga: item.harga
    }));

    this.transaksiService.tambahTransaksi(itemTransaksi, this.totalHarga);

    KeranjangPage.keranjangGlobal = [];
    this.items = [];

    alert('Checkout Berhasil! Data telah masuk ke Riwayat Transaksi.');
  }
}