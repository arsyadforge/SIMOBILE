import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../services/transaksi';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false
})
export class KeranjangPage implements OnInit {
  items: any[] = []; 

  constructor(private transaksiService: Transaksi) { }

  ngOnInit() {}

  prosesCheckout() {
    if (this.items.length === 0) {
      alert('Keranjang belanja Anda masih kosong.');
      return;
    }

    let totalHarga = 0;
    for (let i = 0; i < this.items.length; i++) {
      totalHarga += (this.items[i].harga * this.items[i].jumlah);
    }

    this.transaksiService.tambahTransaksi([...this.items], totalHarga);
    this.items = [];
    
    alert('Checkout Berhasil! Data telah masuk ke Riwayat Transaksi.');
  }
}