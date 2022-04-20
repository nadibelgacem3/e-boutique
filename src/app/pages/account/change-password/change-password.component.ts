import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../../../core/auth/account.service';
import {PasswordService} from '../../../services/password.service';
import Swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  success = false;
  error = false;
  doNotMatch = false;
  account?: any | null;

  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });
  constructor(private fb: FormBuilder,  private accountService: AccountService, private passwordService: PasswordService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
  }

  changePassword(): void {
    this.error = false;
    this.success = false;
    this.doNotMatch = false;


    const newPassword = this.passwordForm.get(['newPassword'])!.value;

    if (newPassword !== this.passwordForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {


      this.passwordService.save(newPassword, this.passwordForm.get(['currentPassword'])!.value).subscribe(
          () => {
            this.success = true;
            this.passwordForm.patchValue({
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
            Swal.fire({
              icon: 'success',
              title: this.translate.instant('password.messages.success'),
              showConfirmButton: false,
              timer: 1500
            });
          },
          () => {
            Swal.fire({
              icon: 'error',
              title: this.translate.instant('password.messages.error'),
              showConfirmButton: false,
              timer: 1500
            });
            this.error = true;
          },
      );
    }

    if (this.success) {
      // this.toastService.showToastUpdate('Update', 'success');
    }
  }

}
