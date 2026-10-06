import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Transaksi {
  daftarTransaksi: any[] = [
    {
      id: 1,
      tanggal: new Date(),
      items: [
        { nama: 'Mie', jumlah: 5, harga: 3500 },
        { nama: 'Teh', jumlah: 2, harga: 8000 }
      ],
      total: 33500
    },
    {
      id: 2,
      tanggal: new Date(),
      items: [
        { nama: 'Beras', jumlah: 1, harga: 20000 },
        { nama: 'Minyak', jumlah: 1, harga: 18000 }
      ],
      total: 38000
    },
    {
      id: 3,
      tanggal: new Date(Date.now() - 24 * 60 * 60 * 1000),
      items: [
        { nama: 'Kopi', jumlah: 3, harga: 12000 }
      ],
      total: 36000
    }
  ];

  getSemuaTransaksi(): any[] {
    return this.daftarTransaksi;
  }

  getTransaksiById(id: number): any {
    for (let i = 0; i < this.daftarTransaksi.length; i++) {
      if (this.daftarTransaksi[i].id == id) return this.daftarTransaksi[i];
    }
    return null;
  }

  tambahTransaksi(items: any[], total: number): void {
    this.daftarTransaksi.push({
      id: this.daftarTransaksi.length + 1,
      tanggal: new Date(),
      items: items,
      total: total
    });
  }

  private sudahHariIni(tanggal: Date): boolean {
    const hariIni = new Date();
    return tanggal.getDate() == hariIni.getDate()
        && tanggal.getMonth() == hariIni.getMonth()
        && tanggal.getFullYear() == hariIni.getFullYear();
  }

  getJumlahTransaksiHariIni(): number {
    let jumlah = 0;
    for (let i = 0; i < this.daftarTransaksi.length; i++) {
      if (this.sudahHariIni(this.daftarTransaksi[i].tanggal)) jumlah++;
    }
    return jumlah;
  }

  getTotalPenjualanHariIni(): number {
    let total = 0;
    for (let i = 0; i < this.daftarTransaksi.length; i++) {
      if (this.sudahHariIni(this.daftarTransaksi[i].tanggal)) {
        total += this.daftarTransaksi[i].total;
      }
    }
    return total;
  }
}