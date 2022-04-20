import {Component, OnInit, Input, HostListener} from '@angular/core';
import {numberSchema} from '../../../app.constants';
import {TranslateService} from '@ngx-translate/core';
import {HomeService} from '../../../services/home.service';
import {Meta} from '@angular/platform-browser';
import {BasketService} from '../../../services/basket.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideService} from '../../../services/slide.service';
import {AuthfakeauthenticationService} from '../../../core/services/authfake.service';
import {AccountService} from '../../../core/auth/account.service';
import {Observable} from 'rxjs';
import {LanguageService} from '../../../core/services/language.service';

@Component({
    selector: 'app-header-one',
    templateUrl: './header-one.component.html',
    styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

    @Input() class: string;
    @Input() themeLogo: string = 'assets/images/icon/blanc.png'; // Default Logo
    @Input() topbar: boolean = true; // Default True
    @Input() sticky: boolean = false; // Default false

    public stick: boolean = false;

    constructor(private translate: TranslateService,
                private homeService: HomeService, private meta: Meta,
                private basketService: BasketService, protected accountService: AccountService,
                private router: Router, public languageService: LanguageService,
                private authFackservice: AuthfakeauthenticationService,
                private route: ActivatedRoute, protected slideService: SlideService,) {

    }

    schemaName = '';
    name = '';
    loginStatus$: Observable<boolean>;

    phone1 = '';
    company = '';


    ngOnInit(): void {

        const url = window.location.href;
        this.schemaName = localStorage.getItem('schemaName');
        if (this.schemaName) {
            this.homeService.queryHeader(this.schemaName).subscribe(value => {
                if (value[0].logo) {
                    this.themeLogo = value[0].logo;
                }
                if (!localStorage.getItem('lang')){
                    localStorage.setItem('lang', value[0].lang);
                    // this.translate.use(code);
                    this.languageService.setLanguage(value[0].lang);
                    if(localStorage.getItem('lang')==="ar"){
                        this.customizeLayoutType('rtl');
                    } else {
                        this.customizeLayoutType('ltr');
                    }
                }else {
                    // this.translate.use(code);
                    this.languageService.setLanguage(localStorage.getItem('lang'));
                    if(localStorage.getItem('lang')==="ar"){
                        this.customizeLayoutType('rtl');
                    } else {
                        this.customizeLayoutType('ltr');
                    }
                }

            });
            this.homeService.getCurrency(this.schemaName).subscribe(res2 => {
                localStorage.setItem('devise', JSON.stringify(res2[0]));
            });
            this.homeService.queryContact(this.schemaName).subscribe(value => {
                this.company = value[0].name;
                this.phone1 = '+216 ' + value[0].phone1;
            });

            this.loginStatus$ = this.authFackservice.isLoggedIn;
            this.loginStatus$.subscribe();
            this.accountService.identity().subscribe(account => {
                    if (account) {
                        this.name = account.firstName + ' ' + account.lastName;
                        localStorage.setItem('name', account.firstName + ' ' + account.lastName);
                    } else {
                        sessionStorage.removeItem('authenticationToken');
                        localStorage.removeItem('currentUser');
                        sessionStorage.clear();
                        this.authFackservice.logout();
                    }
                },
                () => {
                    this.logout();
                });
        } else {
            this.slideService.findByUrl(url.slice(numberSchema, (url.length))).subscribe(res => {
                if (res) {
                    localStorage.setItem('schemaName', res.schemaName);
                    this.schemaName = localStorage.getItem('schemaName');

                    if (this.schemaName) {
                        this.homeService.queryHeader(this.schemaName).subscribe(value => {
                            if (value[0].logo) {
                                this.themeLogo = value[0].logo;
                            }
                            if (!localStorage.getItem('lang')) {
                                localStorage.setItem('lang', value[0].lang);
                                // this.translate.use(code);
                                this.languageService.setLanguage(value[0].lang);
                                if(value[0].lang==="ar"){
                                    this.customizeLayoutType('rtl');
                                } else {
                                    this.customizeLayoutType('ltr');
                                }
                            }else {
                                // this.translate.use(code);
                                this.languageService.setLanguage(localStorage.getItem('lang'));
                                if(localStorage.getItem('lang')==="ar"){
                                    this.customizeLayoutType('rtl');
                                } else {
                                    this.customizeLayoutType('ltr');
                                }
                            }
                            // this.changeIconWithMeta();
                        });
                        this.homeService.getCurrency(this.schemaName).subscribe(res2 => {
                            localStorage.setItem('devise', JSON.stringify(res2[0]));
                        });
                        this.homeService.queryContact(this.schemaName).subscribe(value => {
                            this.company = value[0].name;
                            this.phone1 = '+216 ' + value[0].phone1;
                        });
                        this.loginStatus$ = this.authFackservice.isLoggedIn;
                        this.loginStatus$.subscribe();
                        this.accountService.identity().subscribe(account => {
                                if (account) {
                                    this.name = account.firstName + ' ' + account.lastName;
                                    localStorage.setItem('name', account.firstName + ' ' + account.lastName);
                                } else {
                                    sessionStorage.removeItem('authenticationToken');
                                    localStorage.removeItem('currentUser');
                                    sessionStorage.clear();
                                    this.authFackservice.logout();
                                }
                            },
                            () => {
                                this.logout();
                            });
                    }
                }
            });

        }
    }
    customizeLayoutType(val) {
        if(val == 'rtl') {
            document.body.classList.remove('ltr')
            document.body.classList.add('rtl')
        } else {
            document.body.classList.remove('rtl')
            document.body.classList.add('ltr')
        }
    }
    logout() {
        /* if (environment.defaultauth === 'firebase') {
           this.authService.logout();
         } else {
           this.authFackservice.logout();
         }*/
        // localStorage.clear();
        this.authFackservice.clearCache();
        this.authFackservice.logout();
        this.accountService.authenticate(null);
        this.router.navigate(['/']);
    }

    // @HostListener Decorator
    @HostListener('window:scroll', [])
    onWindowScroll() {
        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number >= 150 && window.innerWidth > 400) {
            this.stick = true;
        } else {
            this.stick = false;
        }
    }

}
