import { Component, OnInit } from '@angular/core';
import { KeranjangPage } from '../keranjang/keranjang.page';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {

  // Data produk
  products: any[] = [

    {
      id: 1,
      nama: 'Beras',
      stok: 10,
      harga: 20000,
      hargaJual: 25000,
      gambar: 'assets/img/beras.jpg',
      jumlah: 0
    },

    {
      id: 2,
      nama: 'Minyak',
      stok: 15,
      harga: 18000,
      hargaJual: 23000,
      gambar: 'assets/img/minyak.jpg',
      jumlah: 0
    },

    {
      id: 3,
      nama: 'Gula',
      stok: 20,
      harga: 17000,
      hargaJual: 22000,
      gambar: 'assets/img/gula.jpg',
      jumlah: 0
    },

    {
      id: 4,
      nama: 'Mie',
      stok: 30,
      harga: 3500,
      hargaJual: 5500,
      gambar: 'assets/img/mie.jpg',
      jumlah: 0
    },

    {
      id: 5,
      nama: 'Teh',
      stok: 12,
      harga: 8000,
      hargaJual: 10000,
      gambar: 'assets/img/teh.jpg',
      jumlah: 0
    },

    {
      id: 6,
      nama: 'Kopi',
      stok: 10,
      harga: 12000,
      hargaJual: 15000,
      gambar: 'assets/img/kopi.jpg',
      jumlah: 0
    },

    {
      id: 7,
      nama: 'Tepung',
      stok: 0,
      harga: 0,
      hargaJual: 0,
      gambar: 'assets/img/def.jpg',
      jumlah: 0
    },

    {
      id: 8,
      nama: 'Jajan',
      stok: 0,
      harga: 0,
      hargaJual: 0,
      gambar: 'assets/img/def.jpg',
      jumlah: 0
    }

  ];


  // Menyimpan produk dalam bentuk baris
  productRows: any[][] = [];


  ngOnInit() {

    // Mengambil data produk terbaru dari localStorage jika tersedia
    const savedProducts =
      localStorage.getItem('products');

    if (savedProducts) {

      this.products =
        JSON.parse(savedProducts);

    }

    // Membuat jumlah awal menjadi 0
    this.products.forEach(product => {

      if (product.jumlah === undefined) {
        product.jumlah = 0;
      }

    });

    // Membagi produk menjadi 3 kolom
    this.productRows =
      this.chunkArray(this.products, 3);

  }


  // Muat ulang data setiap halaman Produk dibuka,supaya perubahan dari halaman Edit/Tambah Produk ikut terbaca
  ionViewWillEnter() {
    this.ngOnInit();
  }


  // Fungsi membagi produk menjadi beberapa baris
  chunkArray(
    arr: any[],
    chunkSize: number
  ): any[][] {

    const result: any[][] = [];

    for (
      let i = 0;
      i < arr.length;
      i += chunkSize
    ) {

      result.push(
        arr.slice(i, i + chunkSize)
      );

    }

    return result;
  }


  // Menambah jumlah produk
  tambahJumlah(product: any) {

    // Jumlah tidak boleh melebihi stok
    if (product.jumlah < product.stok) {

      product.jumlah++;

    }

  }


  // Mengurangi jumlah produk
  kurangJumlah(product: any) {

    // Jumlah tidak boleh kurang dari 0
    if (product.jumlah > 0) {

      product.jumlah--;

    }

  }


  // Menyimpan produk ke keranjang
  simpanKeKeranjang(product: any) {

    // Tidak boleh menyimpan jika jumlah 0
    if (product.jumlah <= 0) {

      alert('Jumlah produk harus lebih dari 0.');

      return;

    }

    // Kirim produk ke halaman keranjang
    KeranjangPage.tambahProduk({
      id: product.id,
      nama: product.nama,
      jumlah: product.jumlah,
      harga: product.hargaJual   
    });

    // Kurangi stok sesuai jumlah yang dimasukkan ke keranjang
    product.stok -= product.jumlah;

    // Simpan stok terbaru agar halaman Detail ikut berubah
    localStorage.setItem(
      'products',
      JSON.stringify(this.products)
    );

    // Reset jumlah pada produk
    product.jumlah = 0;

    alert(
      'Produk berhasil ditambahkan ke keranjang!'
    );

  }

}