import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: false,
})


export class FormPage implements OnInit {

  // Form untuk input data produk
  produkForm!: FormGroup;

  // Menyimpan ID produk ketika edit
  id: number | null = null;

  // Menentukan apakah sedang edit atau tambah
  isEdit: boolean = false;


  // Data awal produk
  products = [

    {
      id: 1,
      nama: 'Beras',
      stok: 10,
      harga: 20000,
      hargaJual: 25000,
      gambar: 'assets/img/beras.jpg'
    },

    {
      id: 2,
      nama: 'Minyak',
      stok: 15,
      harga: 18000,
      hargaJual: 23000,
      gambar: 'assets/img/minyak.jpg'
    },

    {
      id: 3,
      nama: 'Gula',
      stok: 20,
      harga: 17000,
      hargaJual: 22000,
      gambar: 'assets/img/gula.jpg'
    },

    {
      id: 4,
      nama: 'Mie',
      stok: 30,
      harga: 3500,
      hargaJual: 5500,
      gambar: 'assets/img/mie.jpg'
    },

    {
      id: 5,
      nama: 'Teh',
      stok: 12,
      harga: 8000,
      hargaJual: 10000,
      gambar: 'assets/img/teh.jpg'
    },

    {
      id: 6,
      nama: 'Kopi',
      stok: 10,
      harga: 12000,
      hargaJual: 15000,
      gambar: 'assets/img/kopi.jpg'
    },

    {
      id: 7,
      nama: 'Tepung',
      stok: 0,
      harga: 0,
      hargaJual: 0,
      gambar: 'assets/img/def.jpg'
    },

    {
      id: 8,
      nama: 'Jajan',
      stok: 0,
      harga: 0,
      hargaJual: 0,
      gambar: 'assets/img/def.jpg'
    }

  ];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {

    // Mengambil data produk yang sudah tersimpan
    const savedProducts = localStorage.getItem('products');

    // Jika sudah ada data tersimpan,
    // gunakan data tersebut
    if (savedProducts) {

      this.products = JSON.parse(savedProducts);

    }

    // Membuat form
    this.produkForm = this.formBuilder.group({

      // Nama produk
      nama: [
        '',
        Validators.required
      ],

      // Harga beli
      harga: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      // Harga jual
      hargaJual: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      // Stok
      stok: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      // Gambar
      gambar: [
        'assets/img/def.jpg'
      ]

    });


    // Mengecek apakah URL mempunyai ID
    this.route.params.subscribe(params => {

      if (params['id']) {

        // Mengambil ID dari URL
        this.id = Number(params['id']);

        // Mengaktifkan mode edit
        this.isEdit = true;


        // Mencari produk berdasarkan ID
        const product = this.products.find(
          p => p.id === this.id
        );


        // Jika produk ditemukan,
        // masukkan datanya ke form
        if (product) {

          this.produkForm.patchValue({

            nama: product.nama,

            harga: product.harga,

            hargaJual: product.hargaJual,

            stok: product.stok,

            gambar: product.gambar

          });

        }

      }

    });

  }


  submitProduk() {

    // Mengecek validasi form
    if (this.produkForm.invalid) {

      this.produkForm.markAllAsTouched();

      return;

    }


    // Mengambil data dari form
    const formData = this.produkForm.value;


    // ============================
    // MODE EDIT
    // ============================

    if (this.isEdit && this.id !== null) {

      // Mencari index produk
      const index = this.products.findIndex(
        p => p.id === this.id
      );


      // Jika produk ditemukan
      if (index !== -1) {

        // Mengubah data produk
        this.products[index] = {

          id: this.id,

          nama: formData.nama,

          harga: formData.harga,

          hargaJual: formData.hargaJual,

          stok: formData.stok,

          gambar: this.products[index].gambar

        };


        // Menyimpan data terbaru
        localStorage.setItem(
          'products',
          JSON.stringify(this.products)
        );


        console.log(
          'Produk berhasil diedit!',
          this.products[index]
        );


        alert('Produk berhasil diedit!');

      }

    }


    // ============================
    // MODE TAMBAH
    // ============================

    else {

      // Membuat ID baru
      const newId =
        this.products.length > 0
          ? Math.max(...this.products.map(p => p.id)) + 1
          : 1;


      // Membuat produk baru
      const newProduct = {

        id: newId,

        nama: formData.nama,

        harga: formData.harga,

        hargaJual: formData.hargaJual,

        stok: formData.stok,

        gambar: formData.gambar

      };


      // Menambahkan produk ke array
      this.products.push(newProduct);


      // Menyimpan produk ke localStorage
      localStorage.setItem(
        'products',
        JSON.stringify(this.products)
      );


      console.log(
        'Produk berhasil ditambahkan!',
        newProduct
      );


      alert('Produk berhasil ditambahkan!');

    }


    // Kembali ke halaman Produk
    this.router.navigate(['/tabs/produk']);

  }

}