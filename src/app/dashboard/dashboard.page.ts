import { Component, OnInit } from '@angular/core';
import { ProdukData } from '../services/produk-data';
import { Transaksi } from '../services/transaksi';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  jumlahProduk: number = 0;
  jumlahTransaksiHariIni: number = 0;
  totalPenjualanHariIni: number = 0;
  produkTerlaris: string = '';

  constructor(
    private produkService: ProdukData,
    private transaksiService: Transaksi
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.jumlahProduk = this.produkService.getJumlahProduk();
    this.jumlahTransaksiHariIni = this.transaksiService.getJumlahTransaksiHariIni();
    this.totalPenjualanHariIni = this.transaksiService.getTotalPenjualanHariIni();
    
    const terlarisObj = this.produkService.getProdukTerlaris();
    this.produkTerlaris = terlarisObj ? `${terlarisObj.nama} (${terlarisObj.terjual} terjual)` : '-';
  }
}