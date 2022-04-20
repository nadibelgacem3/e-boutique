import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {SettingsComponent} from '../../../shared/components/settings/settings.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Order = {};

  constructor(public productService: ProductService,
    private orderService: OrderService,  private calendar: NgbCalendar) { }
  dateShipping: any;

  ngOnInit(): void {

    this.orderService.checkoutItems.subscribe(response => {
      this.orderDetails = response;
      this.productService.getProducts.subscribe();
      this.productService.setCartItems();
      this.productService.cartItems.subscribe()
      // console.log(this.orderDetails.articles)
      // const products: any = this.orderDetails.product;
      // for (let i = 0; i < this.orderDetails.articles.length; i++) {
      //     this.productService.removeCartItem(this.orderDetails.articles[i]);
      // }
      this.dateShipping = this.calendar.getNext(this.calendar.getToday(), 'd', Number(response.delay) );
    });
    // localStorage.removeItem('cartItems');
    // this.productService.getProducts.subscribe();
  }

  ngAfterViewInit() {
    
  }

}
