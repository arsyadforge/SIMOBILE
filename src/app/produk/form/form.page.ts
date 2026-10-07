import { Component, OnInit } from '@angular/core';
import { ProdukData } from '../../services/produk-data';

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



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produkService: ProdukData
  ) { }


  ngOnInit() {

    // Mengambil data produk yang sudah tersimpan
    //const savedProducts = localStorage.getItem('products');

    // Jika sudah ada data tersimpan,
    // gunakan data tersebut
    /*if (savedProducts) {

      this.products = JSON.parse(savedProducts);

    }*/

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
        const product = this.produkService.getProdukById(this.id);

        if (product != null) {
          this.produkForm.patchValue({
            nama: product.nama,
            harga: product.hargaBeli,
            hargaJual: product.harga,
            stok: product.stok,
            gambar: product.gambar
          });
        }
      }

    });

  }


  submitProduk() {
    if (this.produkForm.invalid) {
      this.produkForm.markAllAsTouched();
      return;
    }

    const formData = this.produkForm.value;

    if (this.isEdit && this.id !== null) {
      this.produkService.ubahProduk(this.id, formData.nama, formData.stok, formData.harga, formData.hargaJual);
      alert('Produk berhasil diedit!');
    } else {
      this.produkService.tambahProduk(formData.nama, formData.stok, formData.harga, formData.hargaJual, formData.gambar);
      alert('Produk berhasil ditambahkan!');
    }

    this.router.navigate(['/produk']);
  }

}