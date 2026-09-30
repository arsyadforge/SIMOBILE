// Mengimpor NgModule untuk membuat module Angular
import { NgModule } from '@angular/core';

// Mengimpor Routes untuk membuat daftar route dan RouterModule untuk menjalankan sistem routing
import { Routes, RouterModule } from '@angular/router';

// Mengimpor ProdukPage sebagai halaman utama produk
import { ProdukPage } from './produk.page';

const routes: Routes = [
  {
    path: '',
    component: ProdukPage
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./detail/detail.module').then(
        m => m.DetailPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdukPageRoutingModule {}