import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: false,
})
export class TransactionsPage implements OnInit {
  transactions: any[] = [];

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.transactions = this.transactionService.getTransactions();
  }

  viewDetail(index: number) {
    this.router.navigate(['/transaction-detail', index]);
  }
}