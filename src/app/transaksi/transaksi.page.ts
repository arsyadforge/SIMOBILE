import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../services/transaksi'; 

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false 
})
export class TransaksiPage implements OnInit {
  riwayat: any[] = [];

  // Inject service Transaksi 
  constructor(private transaksiService: Transaksi) { }

  ngOnInit() {
    this.muatData();
  }

  ionViewWillEnter() {
    this.muatData();
  }

  muatData() {
    this.riwayat = this.transaksiService.getSemuaTransaksi();
  }
}