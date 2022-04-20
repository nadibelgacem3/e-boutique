import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HomeService} from '../../../services/home.service';
import {Meta} from '@angular/platform-browser';
import {BasketService} from '../../../services/basket.service';
import {AccountService} from '../../../core/auth/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthfakeauthenticationService} from '../../../core/services/authfake.service';
import {SlideService} from '../../../services/slide.service';
import {Observable, Subject} from 'rxjs';
import {numberSchema} from '../../../app.constants';
import {takeUntil} from 'rxjs/operators';
import {ProductService} from '../../services/product.service';
import {Product} from '../../classes/product';

@Component({
    selector: 'app-footer-one',
    templateUrl: './footer-one.component.html',
    styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit , OnDestroy{

    @Input() class: string = 'footer-light'; // Default class
    @Input() themeLogo: string = 'assets/images/icon/blanc.png'// Default Logo
    @Input() newsletter: boolean = true; // Default True

    public today: number = Date.now();

    public products: Product[] = [];
    constructor(private translate: TranslateService,
                private homeService: HomeService,
                protected accountService: AccountService,
                private authFackservice: AuthfakeauthenticationService,
                private route: ActivatedRoute, protected slideService: SlideService, public productService: ProductService) {


    }

    schemaName = '';
    name = '';
    loginStatus$: Observable<boolean>;

    phone1 = '';
    company = '';

    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    streetAddress = '';
    postalCode = '';
    city = '';
    stateProvince = '';
    countryName = '';

    codePhone1 = '';
    codePhone2 = '';
    phone2 = '';
    email = '';
    private isDead$ = new Subject();
    categories = [];
    ngOnInit(): void {

        const url = window.location.href;
        this.schemaName = localStorage.getItem('schemaName');
        if (this.schemaName) {
            this.homeService.queryHeader(this.schemaName).subscribe(value => {
                if (value[0].logo) {
                    this.themeLogo = value[0].logo;
                }
                // this.changeIconWithMeta();
            });
            this.homeService.queryFooter(this.schemaName)
                .pipe(takeUntil(this.isDead$))
                .subscribe(value => {
                    this.facebookLink = value[0].facebook;
                    this.twitterLink = value[0].twitter;
                    this.instagramLink = value[0].instagram;
                });
            this.homeService.queryContact(this.schemaName).subscribe(value => {
                this.company = value[0].name;
                this.phone1 = '+216 ' + value[0].phone1;
                this.streetAddress = value[0].companyLocation?.streetAddress;
                this.postalCode = value[0].companyLocation?.postalCode;
                this.city = value[0].companyLocation?.city;
                this.stateProvince = value[0].companyLocation?.stateProvince;
                this.countryName = value[0].companyLocation?.countryName;
                this.codePhone1 = value[0].codePhone1;
                this.codePhone2 = value[0].codePhone2;

                this.phone2 = value[0].phone2;
                this.email = value[0].email1;
            });

            this.productService.getProducts.subscribe(product => {
                this.products = product;
                const category = [...new Set(this.products.map(product2 => product2.type))];
                this.categories = category;
            });
        } else {
            this.slideService.findByUrl(url.slice(numberSchema, (url.length))).subscribe(res => {
                if (res) {
                    localStorage.setItem('schemaName', res.schemaName);
                    this.schemaName = localStorage.getItem('schemaName');

                    if (this.schemaName) {
                        this.homeService.queryFooter(this.schemaName)
                            .pipe(takeUntil(this.isDead$))
                            .subscribe(value => {
                                this.facebookLink = value[0].facebook;
                                this.twitterLink = value[0].twitter;
                                this.instagramLink = value[0].instagram;
                            });
                        this.homeService.queryHeader(this.schemaName).subscribe(value => {
                            this.themeLogo = value[0].logo;
                            // this.changeIconWithMeta();
                        });

                        this.homeService.queryContact(this.schemaName).subscribe(value => {
                            this.company = value[0].name;
                            this.phone1 = '+216 ' + value[0].phone1;
                            this.streetAddress = value[0].companyLocation?.streetAddress;
                            this.postalCode = value[0].companyLocation?.postalCode;
                            this.city = value[0].companyLocation?.city;
                            this.stateProvince = value[0].companyLocation?.stateProvince;
                            this.countryName = value[0].companyLocation?.countryName;
                            this.codePhone1 = value[0].codePhone1;
                            this.codePhone2 = value[0].codePhone2;

                            this.phone2 = value[0].phone2;
                            this.email = value[0].email1;
                        });


                    }
                    this.productService.getProducts.subscribe(product => {
                        this.products = product;
                        const category = [...new Set(this.products.map(product2 => product2.type))];
                        this.categories = category;

                    });
                }
            });

        }
    }

    ngOnDestroy() {
        this.isDead$.next();
    }
    // get filterbyCategory() {
    //     const category = [...new Set(this.products.map(product => product.type))]
    //     return category
    // }

}
