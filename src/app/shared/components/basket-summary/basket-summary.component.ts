import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {IBillOperationEshop, IBillOperationItemEshop} from '../../models/eshop/basket';


@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() decrement: EventEmitter<IBillOperationItemEshop> = new EventEmitter<IBillOperationItemEshop>();
  @Output() increment: EventEmitter<IBillOperationItemEshop> = new EventEmitter<IBillOperationItemEshop>();
  @Output() remove: EventEmitter<IBillOperationItemEshop> = new EventEmitter<IBillOperationItemEshop>();
  @Input() isBasket = true;
  @Input() items: IBillOperationItemEshop[]  = [];
  @Input() basket: IBillOperationEshop;
  @Input() isOrder = false;
  @Input() shippingPrice = 0;
  @Input() subtotal = 0;
  @Input() total = 0;

  constructor() { }
  devise: any;
  ngOnInit() {
    this.devise = JSON.parse(localStorage.getItem('devise'));
  }

  decrementItem(item: IBillOperationItemEshop) {
    this.decrement.emit(item);
  }

  incrementItem(item: IBillOperationItemEshop) {
    this.increment.emit(item);
  }

  removeBasketItem(item: IBillOperationItemEshop) {
    this.remove.emit(item);
  }
}
