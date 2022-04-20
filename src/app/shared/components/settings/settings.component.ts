import {Component, OnInit, Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../classes/product';
import {Router} from '@angular/router';
import {LanguageService} from '../../../core/services/language.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    isCheckout: boolean = false;
    public products: Product[] = [];
    public search: boolean = false;
    keySearch = '';
    public languages = [{
        name: 'global.English',
        code: 'en'
    }, {
        name: 'global.French',
        code: 'fr'
    },
        {
            name: 'global.Arabe',
            code: 'ar'
        }

    ];

    public currencies = [
        //     {
        //   name: 'Euro',
        //   currency: 'EUR',
        //   price: 0.90 // price of euro
        // }, {
        //   name: 'Rupees',
        //   currency: 'INR',
        //   price: 70.93 // price of inr
        // }, {
        //   name: 'Pound',
        //   currency: 'GBP',
        //   price: 0.78 // price of euro
        // }, {
        //   name: 'Dollar',
        //   currency: 'USD',
        //   price: 1 // price of usd
        // }
    ];

    // tslint:disable-next-line:ban-types
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private translate: TranslateService, private router: Router,
                public productService: ProductService, public languageService: LanguageService) {


    }

    ngOnInit(): void {
        this.products = [];
        const dev = JSON.parse(localStorage.getItem('devise'));
        let devise
        if(localStorage.getItem('devise')) {
            devise = {
                name: dev.code,
                currency: dev.code,
                price: 1 // price of code
            };
        } else {
            devise =   {
              name: 'Euro',
              currency: 'EUR',
              price: 1 // price of euro
            }
        }

        this.currencies.push(devise);
        this.productService.Currency = devise;
        this.productService.cartItems.subscribe(response => {
            this.products = response;
        });


    }

    searchToggle() {
        this.search = !this.search;
    }

    changeLanguage(code) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('lang', code);
            // this.translate.use(code);
            this.languageService.setLanguage(code);
            if (code === 'ar') {
                this.customizeLayoutType('rtl');
            } else {
                this.customizeLayoutType('ltr');
            }
        }
    }

    customizeLayoutType(val) {
        if (val == 'rtl') {
            document.body.classList.remove('ltr');
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
            document.body.classList.add('ltr');
        }
    }

    get getTotal(): Observable<number> {
        return this.productService.cartTotalAmount();
    }

    removeItem(product: any) {
        this.productService.removeCartItem(product);
    }

    gotoToOrder() {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/shop/checkout']);
        } else {
            this.router.navigate(['/pages/login']);
        }

    }

    changeCurrency(currency: any) {
        this.productService.Currency = currency;
    }

    searchProducts() {
        this.router.navigate(['/pages/search', this.keySearch]);
        this.searchToggle();
    }
}
