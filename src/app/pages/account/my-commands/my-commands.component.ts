import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../core/auth/account.service';
import {BasketService} from '../../../services/basket.service';
import {IBillOperationEshop} from '../../../shared/models/eshop/basket';
import {ProductService} from '../../../shared/services/product.service';


@Component({
  selector: 'app-my-commands',
  templateUrl: './my-commands.component.html',
  styleUrls: ['./my-commands.component.scss']
})
export class MyCommandsComponent implements OnInit {
  account: any;
  myCommand: IBillOperationEshop[] = [];
  length = 0;
  constructor(private router: Router,  public accountService: AccountService, public basketService: BasketService, public productService: ProductService) { }
  devise: any;
  ngOnInit(): void {
    this.devise = JSON.parse(localStorage.getItem('devise'));
    this.accountService.identity().subscribe(value => {
      this.account = value;
      this.basketService.getCommandeByClient(this.account.id).subscribe(value1 => {
        this.myCommand = value1;
        this.length = value1.length;
      });
    });

  }

  orderDetails() {
    this.router.navigate(['/user/order-details']);
  }
}
