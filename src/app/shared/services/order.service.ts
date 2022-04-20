import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from './product.service';

const state = {
    checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
};

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private router: Router, protected productService: ProductService) {
    }

    // Get Checkout Items
    public get checkoutItems(): Observable<any> {
        const itemsStream = new Observable(observer => {
            observer.next(state.checkoutItems);
            observer.complete();
        });
        return <Observable<any>> itemsStream;
    }

    // Create order
    public createOrder(product: any, details: any, orderId: any, amount: any, frais: any, date: any, delay: any) {
        var item = {
            shippingDetails: details,
            product: product,
            articles: product,
            orderId: orderId,
            totalAmount: amount,
            shipping: frais,
            date,
            delay
        };
        state.checkoutItems = item;
        localStorage.setItem('checkoutItems', JSON.stringify(item));

        // this.productService.clearCart();
         // localStorage.removeItem('cartItems');
        this.router.navigate(['/shop/checkout/success', orderId]);
        // for (let i = 0; i < product.length; i++) {
        //     this.productService.removeCartItem(product[i]);
        // }
    }

}
