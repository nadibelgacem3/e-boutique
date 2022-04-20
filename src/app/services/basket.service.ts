import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import * as uuid from 'uuid';

import {BillOperationEshop, IBasketTotals, IBillOperationEshop, IBillOperationItemEshop} from '../shared/models/eshop/basket';
import {IDeliveryMethod} from '../shared/models/eshop/deliveryMethod';
import {IItem} from '../shared/models/base/item.model';
import Swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {SERVER_API_URL_2} from '../app.constants';

type EntityResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public baseUrl = SERVER_API_URL_2 + 'company-service/api/eshop/bill-operation-eshops';
  public baseUrlItem = SERVER_API_URL_2 + 'company-service/api/eshop/bill-operation-item-eshops';
  public baseUrlCmd = SERVER_API_URL_2 + 'company-service/api/bill-operation-eshops';
  // baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBillOperationEshop>(null);
  // similar to async pipe
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotals$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient, private translate: TranslateService, private router: Router) {
  }

  // createPaymentIntent() {
  //   return this.http.post(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {})
  //     .pipe(
  //       map((basket: IBasket) => {
  //         this.basketSource.next(basket);
  //       })
  //     );
  // }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    const basket = this.getCurrentBasketValue();
    // basket.deliveryMethodId = deliveryMethod.id;
    basket.totalHT = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }

  getBasket(id: string) {
    localStorage.getItem('schemaName');
    const schemaName = localStorage.getItem('schemaName');
    // call the Basket Service
    if (schemaName) {
      return this.http.get(`${this.baseUrl}/${id}/${schemaName}`)
        .pipe(
          map((basket: IBillOperationEshop) => {
            this.basketSource.next(basket);
            this.shipping = basket.totalHT;
            this.calculateTotals();
          }));
    }
  }

  setBasket(basket: IBillOperationEshop) {
    localStorage.getItem('schemaName');
    const schemaName = localStorage.getItem('schemaName');
    // call the Basket Service
    if (schemaName) {
      // this.basketSource.next(basket);
      // this.calculateTotals();
      let totalHt = 0;
      let totalTtc = 0;
      for (let i = 0; i < basket.billOperationItemEshops.length; i++) {
        // basket.lignePaniers[i].panier.id = idPanier;
        totalHt = basket.billOperationItemEshops[i].totalHT + totalHt;
        totalTtc = basket.billOperationItemEshops[i].totalTTC + totalTtc;
      }
      basket.totalHT = totalHt ;
      basket.totalTTC = totalTtc;
      return this.http.post(`${this.baseUrl}/${schemaName}`, basket)
        .subscribe((response: IBillOperationEshop) => {
          // This will update the BehaviorSubject with new value
          this.basketSource.next(response);
          // this.Categories_DATA.map(i => i.articleSubCategories.map(item => item.isFilter = false));
          this.calculateTotals();
        }, (error) => console.log(error));
    }
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IItem, quantity = 1) {
    const itemToAdd: IBillOperationItemEshop = this.mapProductToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.billOperationItemEshops = this.addOrUpdateItem(basket.billOperationItemEshops, itemToAdd, quantity);
    this.basketSource.next(basket);
    Swal.fire({
      icon: 'success',
      title: this.translate.instant('basket.add'),
      showConfirmButton: false,
      timer: 1500
    });
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBillOperationItemEshop) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.billOperationItemEshops.findIndex(x => x.id === item.id);
    basket.billOperationItemEshops[foundItemIndex].quantity++;
    basket.billOperationItemEshops[foundItemIndex].totalHT = (basket.billOperationItemEshops[foundItemIndex].unitPrice *
      basket.billOperationItemEshops[foundItemIndex].quantity)  / (1 + (basket.billOperationItemEshops[foundItemIndex].tva / 100));
    basket.billOperationItemEshops[foundItemIndex].totalTTC = basket.billOperationItemEshops[foundItemIndex].unitPrice *
      basket.billOperationItemEshops[foundItemIndex].quantity;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBillOperationItemEshop) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.billOperationItemEshops.findIndex(x => x.id === item.id);
    if (basket.billOperationItemEshops[foundItemIndex].quantity > 1) {
      basket.billOperationItemEshops[foundItemIndex].quantity--;
      basket.billOperationItemEshops[foundItemIndex].totalHT = (basket.billOperationItemEshops[foundItemIndex].unitPrice *
        basket.billOperationItemEshops[foundItemIndex].quantity) / (1 + (basket.billOperationItemEshops[foundItemIndex].tva / 100));
      basket.billOperationItemEshops[foundItemIndex].totalTTC = basket.billOperationItemEshops[foundItemIndex].unitPrice *
        basket.billOperationItemEshops[foundItemIndex].quantity;
      this.setBasket(basket);
    }
  }

  removeItemFromBasket(item: IBillOperationItemEshop) {
    const basket = this.getCurrentBasketValue();
    localStorage.getItem('schemaName');
    const schemaName = localStorage.getItem('schemaName');
    if (basket.billOperationItemEshops.some(x => x.id === item.id)) {
      basket.billOperationItemEshops = basket.billOperationItemEshops.filter(x => x.id !== item.id);
      this.http.delete(`${this.baseUrlItem}/${basket.id}/${item.id}/${schemaName}`).subscribe(() => {
        if (basket.billOperationItemEshops.length > 0) {
          this.setBasket(basket);
        } else {
          // this.deleteBasket(basket);
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_id');
        }

        // basket.totalHT = basket.totalHT - item.totalHT ;
        // basket.totalTTC = basket.totalTTC - item.totalTTC ;
        // this.basketSource.next(basket);
      });
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBillOperationEshop) {
    localStorage.getItem('schemaName');
    const schemaName = localStorage.getItem('schemaName');
    // call the Basket Service
    if (schemaName) {
      return this.http.delete(`${this.baseUrl}/${basket.id}/${schemaName}`).subscribe(() => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }, error => {
        console.log(error);
      });
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.billOperationItemEshops.reduce((a, b) => (b.unitPrice * b.quantity) + a, 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IBillOperationItemEshop[], itemToAdd: IBillOperationItemEshop,
                          quantity: number): IBillOperationItemEshop[] {
    const index = items.findIndex(i => i.item.id === itemToAdd.item.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
      items[index].totalTTC = (items[index].unitPrice *
        items[index].quantity);
      items[index].totalHT = (items[index].unitPrice * items[index].quantity)  / (1 + (items[index].tva / 100));
    }
    return items;
  }

  private createBasket(): BillOperationEshop {
    const date = this.objDate.year + '-' + ('00' + this.objDate.month).slice(-2) + '-' +
      ('00' + this.objDate.day).slice(-2) + ' ' + ('00' + this.HH).slice(-2) + ':' +
      ('00' + this.mm).slice(-2) + ':00';
    const basket = {
      ...new BillOperationEshop(),
      id: uuid.v4(),
      totalHT: 0,
      totalTTC: 0,
      isPanier: true,
      isInvoice: false,
      isCommand: false,
      date,
      billOperationItemEshops: []
    };
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToBasketItem(item: IItem, quantity: number): IBillOperationItemEshop {
    return {
      id: undefined,
      unitPrice: item.returnedPrice,
      quantity,
      discountRate: 0,
      tva: item.tva,
      totalHT: (item.returnedPrice * quantity) / (1 + (item.tva / 100)),
      totalTTC: item.returnedPrice * quantity,
      item,
    };
  }

  currentDate = new Date();
  day = this.currentDate.getDate();
  month = this.currentDate.getMonth() + 1;
  year = this.currentDate.getFullYear();
  HH = this.currentDate.getHours();
  mm = this.currentDate.getMinutes();

  objDate = {
    year: this.year,
    month: this.month,
    day: this.day
  };
  getCommand(client, location, total, reference, avatarPdf, pdfUrl, configShipping, paymntEshop ): IBillOperationEshop {
    const date = this.objDate.year + '-' + ('00' + this.objDate.month).slice(-2) + '-' +
      ('00' + this.objDate.day).slice(-2) + ' ' + ('00' + this.HH).slice(-2) + ':' +
      ('00' + this.mm).slice(-2) + ':00';
    const basket = this.getCurrentBasketValue();
    const cmd: IBillOperationEshop = {
      id: uuid.v4(),
      reference,
      totalHT: basket.totalHT,
      totalTTC: basket.totalTTC,
      totalAPayer: total,
      billOperationItemEshops: basket.billOperationItemEshops,
      clientId: client.id,
      clientName: client.firstName + ' ' + client.lastName,
      phone: client.phone,
      email: client.email,
      address: location,
      status: 'DRAFT',
      date,
      dueDate: date,
      isPanier: false,
      isInvoice: false,
      isCommand: true,
      shippingConfig: configShipping,
      avatarPdf,
      pdf: pdfUrl,
      paymentEshop: paymntEshop
    };
    return cmd;
  }
  saveCommand(cmd) {

    this.create(cmd).subscribe(res => {
      // this.basketSource.next(null);
      // this.basketTotalSource.next(null);
      // localStorage.removeItem('basket_id');
      // this.router.navigate(['/ecommerce/products']);
      Swal.fire({
        icon: 'success',
        title: this.translate.instant('action.add_msg'),
        showConfirmButton: false,
        timer: 1500
      });
    });

  }



  create(cmd: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.baseUrlCmd, cmd, {observe: 'response'});
  }

  getCommandeByClient(idUser: string): Observable<any> {
    return this.http.get(`${this.baseUrlCmd}/ClientBillOperation/${idUser}`);
  }

  getRefCommand(): any {
    return this.http.get(`${this.baseUrlCmd}/proposeReference`);
  }

}
