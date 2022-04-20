import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../register/register.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../core/auth/account.service';
import {AuthfakeauthenticationService} from '../../../core/services/authfake.service';
import {TranslateService} from '@ngx-translate/core';
import {PaymentService} from '../../../services/payment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // set the currenr year
  year: number = new Date().getFullYear();
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private registerService: RegisterService,
              private router: Router,protected paymentService: PaymentService,
              public accountService: AccountService,
              private authFackservice: AuthfakeauthenticationService,
              private activatedRoute: ActivatedRoute, private translate: TranslateService) {
  }

  url = "";

  ngOnInit(): void {
    const schema = localStorage.getItem('schemaName');
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    this.createLoginForm(schema);
    if (localStorage.getItem('logo')) {
      this.url = localStorage.getItem('logo');
    }

    // document.body.removeAttribute('data-layout');
  }

  createLoginForm(schema) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required),
      schemaName: new FormControl(schema),
    });
  }

  /*  chackUniqueMail(): AsyncValidatorFn {
      // we are returning inner observable to outer Observable which is control via switch map
      return control => {
        return timer(500).pipe(
          switchMap(() => {
            if (!control.value) {
              return of(null);
            }
            return this.registerService.checkEmailExists(control.value.trim()).pipe(
              map(res => {
                return res ? {emailExists: false} : null;
              })
            );
          }));
      };
    }*/

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authFackservice.login(this.loginForm.value).pipe()
        .subscribe(
            data => {
              this.accountService.identity().subscribe(account => {
                let isConnect = false;
                if (account) {
                  this.accountService.authenticate(account);
                  for (let i = 0; i < account.authorities.length; i++) {
                    if (account.authorities[i] === 'ROLE_ESHOP_CLIENT') {
                      isConnect = true;
                    }
                  }
                }
                if (isConnect) {
                  this.router.navigate(['/']);
                } else {
                  this.logout();
                }


              });

            },
            error => {
              Swal.fire({
                icon: 'info',
                title: this.translate.instant('action.error'),
                showConfirmButton: false,
                timer: 1500
              });
            });
  }

  /**
   * Logout the user
   */
  logout() {
    this.authFackservice.logout();
    this.router.navigate(['/']);
    this.accountService.authenticate(null);
  }
}
