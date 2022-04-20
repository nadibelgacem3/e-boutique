import { Component, OnInit } from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  year: number = new Date().getFullYear();
  registerForm: FormGroup;
  errors: string[];
  schemaName =  null;

  constructor(private fb: FormBuilder,
              private router: Router,private toastrService: ToastrService,
              private registerService: RegisterService, protected translate: TranslateService) {
  }
  url = "";
  ngOnInit(): void {
    this.createRegisterForm();
    if (localStorage.getItem('logo')) {
      this.url = localStorage.getItem('logo');
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')], [this.chackUniqueMail()]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      langKey: ['fr'],
      login: ['publicUser'],
      schemaName: localStorage.getItem('schemaName')
    });
  }
  chackUniqueMail(): AsyncValidatorFn {
    // we are returning inner observable to outer Observable which is control via switch map
    return control => {
      return timer(500).pipe(
          switchMap(() => {
            if (!control.value) {
              return of(null);
            }
            return this.registerService.checkEmailExists(control.value.trim(), localStorage.getItem('schemaName')).pipe(
                map(res => {
                  return res ? {emailExists: false} : null;
                })
            );
          }));
    };
  }

  onSubmit() {
    const newPassword = this.registerForm.get(['password'])!.value;
    const confirmPassword = this.registerForm.get(['confirmPassword'])!.value;
    if (newPassword === confirmPassword){
      this.registerService.register(this.registerForm.value).subscribe(() => {
        this.router.navigate(['/pages/login']);
      }, (err) => {
        this.errors = err.errors;
      });
    } else {
      this.toastrService.error(this.translate.instant('The password and its confirmation do not match!'));
    }

  }

}
