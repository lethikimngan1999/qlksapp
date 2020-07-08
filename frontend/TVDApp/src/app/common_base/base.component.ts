import * as CONFIG from './../app.config';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

export class BaseComponent {
    constructor(
        public router: Router,
        public loginService: LoginService) {
        this.isLogin();
    }

    public getTokenFromLocalStorage() {
        return localStorage.getItem(CONFIG.localStorageKey);
    }
    setTokenFromLocalStorage(value: string) {
        localStorage.setItem(CONFIG.localStorageKey, value);
    }

    isLogin() {
        const tokenData = this.getTokenFromLocalStorage();
        if (tokenData && tokenData !== 'null') {
        }
        else {
            this.setTokenFromLocalStorage('');
            this.router.navigateByUrl('/login');
        }
    }
}

