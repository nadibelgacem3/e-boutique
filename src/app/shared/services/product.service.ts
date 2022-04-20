import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, startWith, delay} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../classes/product';
import {ListArticleWithItem} from '../models/base/list-article-with-item';
import {ArticleService} from '../../services/article.service';
import {numberSchema, SERVER_API_URL_2} from '../../app.constants';
import {SlideService} from '../../services/slide.service';
import {TranslateService} from '@ngx-translate/core';

const state = {
    products: JSON.parse(localStorage['products'] || '[]'),
    wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
    compare: JSON.parse(localStorage['compareItems'] || '[]'),
    cart: JSON.parse(localStorage['cartItems'] || '[]')
};

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public Currency = {name: 'Dollar', currency: 'USD', price: 1}; // Default Currency
    public OpenCart = false;
    public Products;

    constructor(private http: HttpClient, private productService: ArticleService, protected slideService: SlideService,
                private toastrService: ToastrService, protected translate: TranslateService) {
    }

    /*
      ---------------------------------------------
      ---------------  Product  -------------------
      ---------------------------------------------
    */
    public resourceUrl = SERVER_API_URL_2 + 'company-service/api/eshop/articles';

    // Product
    private get products(): Observable<Product[]> {
        const schemaName = localStorage.getItem('schemaName');
        if (schemaName) {
            this.Products = this.http.get<any[]>(`${this.resourceUrl}/articlesWithItemsWithEshopPrice/${schemaName}`).pipe(map(data => {
                    const prods = [];
                    for (let i = 0; i < data.length; i++) {

                        const imgs = [];
                        if (data[i].article.image) {
                            const image = {
                                image_id: '111',
                                id: 1,
                                alt: 'image',
                                src: data[i].article.image,
                                variant_id: [
                                    111,
                                    204,
                                ]
                            };
                            imgs.push(image);
                        } else {
                            const image = {
                                image_id: '111',
                                id: 1,
                                alt: 'image',
                                src: '',
                                variant_id: [
                                    111,
                                    204,
                                ]
                            };
                            imgs.push(image);
                        }
                        let variantsValues = [];
                        const variants = [];
                        const tags = [];
                        const tagsProducts = [];
                        tags.push(data[i].article.marque.nameConfigTranslated);
                        for (let j = 0; j < data[i].article.articleTags.length; j++) {
                            tags.push(data[i].article.articleTags[j].nameConfigTranslated);
                            tagsProducts.push(data[i].article.articleTags[j].nameConfigTranslated);
                        }
                        let item = null;
                        if (data[i].article.hasVariant) {
                            variantsValues = data[i].articleVariantsVariantValues;
                            for (let k = 0; k < variantsValues.length; k++) {
                                for (let j = 0; j < variantsValues[k].variantValueNames.length; j++) {
                                    const varaint = {
                                        'variant_id': 101,
                                        'id': 1,
                                        'sku': 'sku1',
                                        'name': variantsValues[k].variantName,
                                        'size': variantsValues[k].variantValueNames[j],
                                        'color': '',
                                        'image_id': 111
                                    };
                                    tags.push(variantsValues[k].variantValueNames[j]);
                                    variants.push(varaint);
                                }
                            }
                            for (let j = 0; j < data[i].itemList.length; j++) {
                                if (data[i].itemList[j].imageItems.length > 0) {
                                    const image = {
                                        image_id: '111',
                                        id: 1,
                                        alt: '',
                                        src: data[i].itemList[j].imageItems[0].name,
                                        variant_id: [
                                            111,
                                            204,
                                        ]
                                    };
                                    imgs.push(image);
                                }

                            }

                        } else {
                            item = data[i].itemList[0];
                            const varaint = {
                                'variant_id': 101,
                                'id': 1,
                                'sku': 'sku1',
                                'name': '',
                                'size': '',
                                'color': '',
                                'image_id': 111
                            };
                            variants.push(varaint);
                        }


                        const product = {
                            id: data[i].article.id,
                            title: data[i].article.name,
                            reference: data[i].article.reference,
                            description: data[i].article.description,
                            type: data[i].article.articleSubCategory.articleCategory.nameConfigTranslated,
                            brand: data[i].article.marque.nameConfigTranslated,
                            collection: [data[i].article.articleSubCategory.articleCategory.nameConfigTranslated],
                            tags,
                            tagsProducts,
                            category: data[i].article.articleSubCategory.nameConfigTranslated,
                            price: data[i].article.returnedPrice,
                            sale: false,
                            discount: 0,
                            articleVariantsVariantValues: variantsValues,
                            itemList: data[i].itemList,
                            hasVariant: data[i].article.hasVariant,
                            stock: data[i].article.totalShopQuantity,
                            new: false,
                            variants,
                            images: imgs,
                            item
                        };
                        prods.push(product);
                    }
                    return prods;
                }
            ));

            this.Products.subscribe(next => {
                localStorage['products'] = JSON.stringify(next);
            });
            return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
        }

    }

    // Get Products
    public get getProducts(): Observable<Product[]> {
        return this.products;
    }

    // Get Products By Slug
    public getProductBySlug(slug: string): Observable<Product> {
        return this.products.pipe(map(items => {
            return items.find((item: any) => {
                return item.id === slug;
            });
        }));
    }


    /*
      ---------------------------------------------
      ---------------  Wish List  -----------------
      ---------------------------------------------
    */

    // Get Wishlist Items
    public get wishlistItems(): Observable<Product[]> {
        const itemsStream = new Observable(observer => {
            observer.next(state.wishlist);
            observer.complete();
        });
        return itemsStream as Observable<Product[]>;
    }

    // Add to Wishlist
    public addToWishlist(product): any {
        const wishlistItem = state.wishlist.find(item => item.id === product.id);
        if (!wishlistItem) {
            state.wishlist.push({
                ...product
            });
        }
        this.toastrService.success(this.translate.instant('Product has been added in wishlist.'));
        localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
        return true;
    }

    // Remove Wishlist items
    public removeWishlistItem(product: Product): any {
        const index = state.wishlist.indexOf(product);
        state.wishlist.splice(index, 1);
        localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
        return true;
    }

    /*
      ---------------------------------------------
      -------------  Compare Product  -------------
      ---------------------------------------------
    */

    // Get Compare Items
    public get compareItems(): Observable<Product[]> {
        const itemsStream = new Observable(observer => {
            observer.next(state.compare);
            observer.complete();
        });
        return itemsStream as Observable<Product[]>;
    }

    // Add to Compare
    public addToCompare(product): any {
        const compareItem = state.compare.find(item => item.id === product.id);
        if (!compareItem) {
            state.compare.push({
                ...product
            });
        }
        this.toastrService.success(this.translate.instant('Product has been added in compare.'));
        localStorage.setItem('compareItems', JSON.stringify(state.compare));
        return true;
    }

    // Remove Compare items
    public removeCompareItem(product: Product): any {
        const index = state.compare.indexOf(product);
        state.compare.splice(index, 1);
        localStorage.setItem('compareItems', JSON.stringify(state.compare));
        return true;
    }

    /*
      ---------------------------------------------
      -----------------  Cart  --------------------
      ---------------------------------------------
    */

    // Get Cart Items
    public get cartItems(): Observable<Product[]> {
        const itemsStream = new Observable(observer => {
            observer.next(state.cart);
            observer.complete();
        });
        return itemsStream as Observable<Product[]>;
    }

    // Set Cart Items
    public setCartItems() {
        state.cart = [];
        localStorage.setItem('cartItems', JSON.stringify([]));
    }

    // Add to Cart
    public addToCart(product): any {
        const cartItem = state.cart.find(item => item.id === product.id);
        const qty = product.quantity ? product.quantity : 1;
        const items = cartItem ? cartItem : product;
        const stock = this.calculateStockCounts(items, qty);

        if (!stock) {
            return false;
        }

        if (cartItem) {
            cartItem.quantity += qty;
        } else {
            state.cart.push({
                ...product,
                quantity: qty
            });
        }

        this.OpenCart = true; // If we use cart variation modal
        localStorage.setItem('cartItems', JSON.stringify(state.cart));
        return true;
    }

    // Update Cart Quantity
    public updateCartQuantity(product: Product, quantity: number): Product | boolean {
        return state.cart.find((items, index) => {
            if (items.id === product.id) {
                const qty = state.cart[index].quantity + quantity;
                const stock = this.calculateStockCounts(state.cart[index], quantity);
                if (qty !== 0 && stock) {
                    state.cart[index].quantity = qty;
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cart));
                return true;
            }
        });
    }

    // Calculate Stock Counts
    public calculateStockCounts(product, quantity) {
        const qty = product.quantity + quantity;
        const stock = product.stock;
        if (stock < qty || stock == 0) {
            this.toastrService.error(this.translate.instant('You can not add more items than available. In stock ') + stock + this.translate.instant('items'));
            return false;
        }
        return true;
    }

    // Remove Cart items
    public removeCartItem(product: Product): any {
        const index = state.cart.indexOf(product);
        state.cart.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(state.cart));
        return true;
    }

    // Total amount
    public cartTotalAmount(): Observable<number> {
        return this.cartItems.pipe(map((product: Product[]) => {
            return product.reduce((prev, curr: Product) => {
                let price = curr.price;
                if (curr.discount) {
                    price = curr.price - (curr.price * curr.discount / 100);
                }
                return (prev + price * curr.quantity) * this.Currency.price;
            }, 0);
        }));
    }

    /*
      ---------------------------------------------
      ------------  Filter Product  ---------------
      ---------------------------------------------
    */

    // Get Product Filter
    public filterProducts(filter: any): Observable<Product[]> {
        return this.products.pipe(map(product =>
            product.filter((item: Product) => {
                if (!filter.length) {
                    return true;
                }
                const Tags = filter.some((prev) => { // Match Tags
                    if (item.tags) {
                        if (item.tags.includes(prev)) {
                            return prev;
                        }
                    }
                });
                return Tags;
            })
        ));
    }

    // Sorting Filter
    public sortProducts(products: Product[], payload: string): any {

        if (payload === 'ascending') {
            return products.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'a-z') {
            return products.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                } else if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'z-a') {
            return products.sort((a, b) => {
                if (a.title > b.title) {
                    return -1;
                } else if (a.title < b.title) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'low') {
            return products.sort((a, b) => {
                if (a.price < b.price) {
                    return -1;
                } else if (a.price > b.price) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'high') {
            return products.sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                } else if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
        }
    }

    /*
      ---------------------------------------------
      ------------- Product Pagination  -----------
      ---------------------------------------------
    */
    public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        // Paginate Range
        const paginateRange = 3;

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage < paginateRange - 1) {
            startPage = 1;
            endPage = startPage + paginateRange - 1;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

}
