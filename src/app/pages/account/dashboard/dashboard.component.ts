import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../core/auth/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthfakeauthenticationService} from '../../../core/services/authfake.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public openDashboard: boolean = false;
    isInfo = "active";
  isAddress = "";
  isOrders = "";
  isAccount = "";
  isPassword = "";
  account: any;
  constructor(protected accountService: AccountService,
              private router: Router,
              private authFackservice: AuthfakeauthenticationService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  logout() {
    this.authFackservice.clearCache();
    this.authFackservice.logout();
    this.accountService.authenticate(null);
    this.router.navigate(['/']);
  }

  showInfo() {
   this.isInfo = "active";
    this.isAddress = "";
    this.isOrders = "";
    this.isAccount = "";
    this.isPassword = "";
  }

  showAddress() {
    this.isInfo = "";
    this.isAddress = "active";
    this.isOrders = "";
    this.isAccount = "";
    this.isPassword = "";
  }

  showAccount() {
    this.isInfo = "";
    this.isAddress = "";
    this.isOrders = "";
    this.isAccount = "active";
    this.isPassword = "";
  }

  showPassword() {
    this.isInfo = "";
    this.isAddress = "";
    this.isOrders = "";
    this.isAccount = "";
    this.isPassword = "active";
  }

    showOrder() {
      this.isInfo = "";
      this.isAddress = "";
      this.isOrders = "active";
      this.isAccount = "";
      this.isPassword = "";
    }
}
