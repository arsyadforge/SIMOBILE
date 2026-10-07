import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
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
  constructor(private transaksiService: Transaksi, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.muatData();
  }

  ionViewWillEnter() {
    this.muatData();
    this.cdr.detectChanges();
  }

  muatData() {
    this.riwayat = this.transaksiService.getSemuaTransaksi();
  }
}