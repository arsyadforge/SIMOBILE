import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: any[] = [];

  constructor() { }

  getTransactions() {
    return this.transactions;
  }

  addTransaction(transaction: any) {
    this.transactions.unshift(transaction);
  }
}