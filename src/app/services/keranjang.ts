import { Service } from '@angular/core';

@Service()
export class Keranjang {
    items: any[] = [];

    tambahItem(p_id: number, p_nama: string, p_jumlah: number, p_harga: number) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id == p_id) {
                this.items[i].jumlah += p_jumlah;
                return;
            }
        }
        this.items.push({ id: p_id, nama: p_nama, jumlah: p_jumlah, harga: p_harga });
    }

    getTotalHarga(): number {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].harga * this.items[i].jumlah;
        }
        return total;
    }

    kosongkan() {
        this.items = [];
    }
}
