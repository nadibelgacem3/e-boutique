import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public products: Product[] = [];

  constructor(private router: Router, 
    public productService: ProductService) {
    this.productService.wishlistItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  async addToCart(product: any) {
    if(product.hasVariant){
      this.router.navigate(['/shop/product/left/sidebar', product.id]);
    }else {
      const status = await this.productService.addToCart(product);
      if(status) {
        this.router.navigate(['/shop/cart']);
      }
    }
  }
  gotoToOrder() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/shop/checkout']);
    } else {
      this.router.navigate(['/pages/login']);
    }

  }
  removeItem(product: any) {
    this.productService.removeWishlistItem(product);
  }

}
