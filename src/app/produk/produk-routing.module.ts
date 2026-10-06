import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

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
  },

  {
    path: 'form',
    loadChildren: () =>
      import('./form/form.module').then(
        m => m.FormPageModule
      )
  },

  {
    path: 'form/:id',
    loadChildren: () =>
      import('./form/form.module').then(
        m => m.FormPageModule
      )
  }

];


@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class ProdukPageRoutingModule {}