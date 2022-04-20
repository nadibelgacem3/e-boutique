import {Component, PLATFORM_ID, Inject, ApplicationRef, OnInit} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {map, delay, withLatestFrom} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {interval} from 'rxjs';
import {BasketService} from './services/basket.service';
import {SlideService} from './services/slide.service';
import {Meta, Title} from '@angular/platform-browser';
import {HomeService} from './services/home.service';
import {SwUpdate} from '@angular/service-worker';
import {numberSchema} from './app.constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'nazox';

    constructor(private basketService: BasketService, private appRef: ApplicationRef, protected slideService: SlideService,private update: SwUpdate,
                private homeService: HomeService, private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(localStorage.getItem('entreprise'));
        const url = window.location.href;
        this.slideService.findByUrl(url.slice(numberSchema, (url.length))).subscribe(res => {
            let schemaName = null;
            if (res) {
                localStorage.setItem('schemaName', res.schemaName);
                schemaName = localStorage.getItem('schemaName');
                this.homeService.queryHeader(schemaName)
                    .subscribe(value => {
                        if (value[0].logo) {
                            localStorage.setItem('logo', value[0].logo);
                        } else {
                            localStorage.setItem('logo', 'assets/images/dragon.ico');
                        }
                        this.changeIconWithMeta();
                    });
            }
        });
        this.checkUpdate();
        this.updateClient();

    }

    favIcon: HTMLLinkElement = document.querySelector('#appIcon');

    changeIconWithMeta() {
        this.favIcon.href = localStorage.getItem('logo');
    }

    // loadBasket() {
    //     const basketId = localStorage.getItem('basket_id');
    //     if (basketId) {
    //         this.basketService.getBasket(basketId).subscribe(() => {
    //         }, error => console.log(error));
    //     }
    // }
    updateClient() {
        //check is ws is enabled or not
        if (!this.update.isEnabled) {
            console.log('Not Enabled');
            return;
        }
        this.update.available.subscribe(event => {
            console.log(`current ${event.current} avaliable ${event.available}`);
            if (confirm('updating to new version')) {
                this.update.activateUpdate().then(() => location.reload());
            }
        });

        this.update.activated.subscribe(event => {
            console.log(`previous ${event.previous} current ${event.current}`);
        });
    }

    checkUpdate() {
        this.appRef.isStable.subscribe(isStable => {
            if (isStable) {
                const timeInterval = interval(8 * 60 * 60 * 1000);
                //const timeInterval = interval(2000);


                timeInterval.subscribe(() => {
                    this.update.checkForUpdate().then(() => {
                        console.log('cheked');
                    });
                });
            }
        });
    }
    register = () => {

    }
}

export function register(): void {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./ngsw-worker.js")
            .then(function(registration) {
                // Successful registration
                console.log(
                    "Hooray. Registration successful, scope is:",
                    registration.scope
                );
            })
            .catch(function(error) {
                // Failed registration, service worker wonâ€™t be installed
                console.log(
                    "Whoops. Service worker registration failed, error:",
                    error
                );
            });
    }
}
