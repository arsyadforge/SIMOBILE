import { Service } from '@angular/core';

@Service()
export class Auth {
    users: any[] = [
        { username: 'admin', password: 'admin', name: 'Administrator' },
        { username: 'raihan', password: '12345', name: 'Raihan' },
    ];
    isLoggedIn: boolean = false;
    currentUser: any = null;

    constructor() { }

    login(p_username: string, p_password: string): boolean {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username == p_username && this.users[i].password == p_password) {
                this.isLoggedIn = true;
                this.currentUser = this.users[i];
                return true;
            }
        }
        return false;
    }

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
    }
}
