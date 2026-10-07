import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Keranjang } from '../services/keranjang';
import { ProdukData } from '../services/produk-data';
import { Transaksi } from '../services/transaksi';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false
})
export class KeranjangPage implements OnInit {

  // public supaya bisa dibaca langsung dari HTML
  constructor(
    public keranjangService: Keranjang,
    private produkService: ProdukData,
    private transaksiService: Transaksi,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  // Setiap halaman Keranjang dibuka, gambar ulang tampilannya
  ionViewWillEnter() {
    this.cdr.detectChanges();
  }

  prosesCheckout() {
    const items = this.keranjangService.items;

    if (items.length == 0) {
      alert('Keranjang belanja Anda masih kosong.');
      return;
    }

    // salin item untuk riwayat, sekaligus tambah jumlah terjual tiap produk
    let itemTransaksi: any[] = [];
    for (let i = 0; i < items.length; i++) {
      itemTransaksi.push({
        nama: items[i].nama,
        jumlah: items[i].jumlah,
        harga: items[i].harga
      });
      this.produkService.tambahTerjual(items[i].id, items[i].jumlah);
    }

    this.transaksiService.tambahTransaksi(itemTransaksi, this.keranjangService.getTotalHarga());
    this.keranjangService.kosongkan();

    alert('Checkout Berhasil! Data telah masuk ke Riwayat Transaksi.');
  }
}