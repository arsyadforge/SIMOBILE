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

  produkForm!: FormGroup;

  id: number | null = null;

  isEdit: boolean = false;


  products = [

    {
      id: 1,
      nama: 'Beras',
      stok: 10,
      harga: 20000,
      gambar: 'assets/img/beras.jpg'
    },

    {
      id: 2,
      nama: 'Minyak',
      stok: 15,
      harga: 18000,
      gambar: 'assets/img/minyak.jpg'
    },

    {
      id: 3,
      nama: 'Gula',
      stok: 20,
      harga: 17000,
      gambar: 'assets/img/gula.jpg'
    },

    {
      id: 4,
      nama: 'Mie',
      stok: 30,
      harga: 3500,
      gambar: 'assets/img/mie.jpg'
    },

    {
      id: 5,
      nama: 'Teh',
      stok: 12,
      harga: 8000,
      gambar: 'assets/img/teh.jpg'
    },

    {
      id: 6,
      nama: 'Kopi',
      stok: 10,
      harga: 12000,
      gambar: 'assets/img/kopi.jpg'
    },

    {
      id: 7,
      nama: 'Tepung',
      stok: 0,
      harga: 0,
      gambar: 'assets/img/def.jpg'
    },

    {
      id: 8,
      nama: 'Jajan',
      stok: 0,
      harga: 0,
      gambar: 'assets/img/def.jpg'
    }

  ];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {

    this.produkForm = this.formBuilder.group({

      nama: [
        '',
        Validators.required
      ],

      harga: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      stok: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      gambar: [
        'assets/img/def.jpg'
      ]

    });


    this.route.params.subscribe(params => {

      if (params['id']) {

        this.id = Number(params['id']);

        this.isEdit = true;


        const product = this.products.find(
          p => p.id === this.id
        );


        if (product) {

          this.produkForm.patchValue({

            nama: product.nama,

            harga: product.harga,

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


    if (this.isEdit) {

      console.log('Produk berhasil diedit!');

      console.log('ID Produk:', this.id);

      console.log(
        'Data Produk:',
        this.produkForm.value
      );

      alert('Produk berhasil diedit!');

    }

    else {

      console.log('Produk berhasil ditambahkan!');

      console.log(
        'Data Produk:',
        this.produkForm.value
      );

      alert('Produk berhasil ditambahkan!');

    }


    this.router.navigate(['/produk']);

  }

}