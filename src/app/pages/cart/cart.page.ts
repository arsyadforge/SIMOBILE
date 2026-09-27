import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { TransactionService } from '../../services/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = this.cartService.getTotalAmount();
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.loadCart();
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Keranjang masih kosong!');
      return;
    }

    // Simpan ke riwayat transaksi
    this.transactionService.addTransaction({
      date: new Date(),
      items: [...this.cartItems],
      total: this.totalAmount
    });

    // Kosongkan keranjang
    this.cartService.clearCart();
    
    alert('Transaksi Berhasil Dikonfirmasi!');
    this.router.navigate(['/tabs/transactions']);
  }
}