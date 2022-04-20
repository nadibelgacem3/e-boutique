import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDetailsMainSlider, ProductDetailsThumbSlider} from '../../../../shared/data/slider';
import {Product} from '../../../../shared/classes/product';
import {ProductService} from '../../../../shared/services/product.service';
import {SizeModalComponent} from '../../../../shared/components/modal/size-modal/size-modal.component';
import {ArticleService} from '../../../../services/article.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-product-left-sidebar',
    templateUrl: './product-left-sidebar.component.html',
    styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

    public product: Product = {};
    public counter: number = 1;
    public activeSlide: any = 0;
    public selectedSize: any;
    public mobileSidebar: boolean = false;

    @ViewChild('sizeChart') SizeChart: SizeModalComponent;

    public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
    public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

    constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, protected translate: TranslateService,
                public productService: ProductService, private dialogService: NgbModal,   private toastrService: ToastrService) {

    }

    variants = [];


    ngOnInit(): void {
        this.route.data.subscribe(response => {
            this.product = response.data;
            this.product.itemList.map(i => i.qty = 1);
            const schemaName = localStorage.getItem('schemaName');
            this.articleService.findArticleVariantsVariantValues(this.product.id, schemaName).subscribe(res => {
                this.variants = res;
            });
        });
    }

    // Get Product Color
    Color(variants) {
        const uniqColor = [];
        for (let i = 0; i < Object.keys(variants).length; i++) {
            if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
                uniqColor.push(variants[i].color);
            }
        }
        return uniqColor;
    }

    // Get Product Size
    Size(variants) {
        const uniqSize = [];
        for (let i = 0; i < Object.keys(variants).length; i++) {
            if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
                uniqSize.push(variants[i].size);
            }
        }
        return uniqSize;
    }

    selectSize(size) {
        this.selectedSize = size;
    }

    // Increament
    increment() {
        this.counter++;
    }

    // Decrement
    decrement() {
        if (this.counter > 1) {
            this.counter--;
        }
    }

    // Add to cart
    async addToCart(product: any, listItems: TemplateRef<any>) {
        if (product.hasVariant) {
            this.showVariant(listItems);
        } else {
            product.quantity = this.counter || 1;
            const status = await this.productService.addToCart(product);
            if (status) {
                this.router.navigate(['/shop/cart']);
            }
        }

    }

    // Buy Now
    async buyNow(product: any, listItems: TemplateRef<any>) {
        if (product.hasVariant) {
            if (localStorage.getItem('currentUser')) {
                this.router.navigate(['/shop/checkout']);
            } else {
                this.router.navigate(['/pages/login']);
            }
        } else {
            product.quantity = this.counter || 1;
            const status = await this.productService.addToCart(product);
            if (status) {
                if (localStorage.getItem('currentUser')) {
                    this.router.navigate(['/shop/checkout']);
                } else {
                    this.router.navigate(['/pages/login']);
                }
            }
        }

    }

    // Add to Wishlist
    addToWishlist(product: any) {
        this.productService.addToWishlist(product);
    }

    // Toggle Mobile Sidebar
    toggleMobileSidebar() {
        this.mobileSidebar = !this.mobileSidebar;
    }

    showVariant(listItems: TemplateRef<any>) {
        this.dialogService.open(
            listItems, {centered: true, size: 'lg'});
    }

    buyNowItem() {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/shop/checkout']);
        } else {
            this.router.navigate(['/pages/login']);
        }
    }


    minusQty(i: number) {
        if (this.product.itemList[i].qty > 1) {
            this.product.itemList[i].qty = this.product.itemList[i].qty - 1;
            // this.basketService.addItemToBasket( this.article.itemList[i], this.article.itemList[i].qty);
        }

    }

    plusQty(i: number) {
        this.product.itemList[i].qty = this.product.itemList[i].qty + 1;
        // this.basketService.addItemToBasket( this.article.itemList[i], this.article.itemList[i].qty);
    }

    async addListItemToBasket(item: any, qty: any) {
        console.log(item);
        const imgs = [];
        if (item.imageItems.length > 0) {
            if (item.imageItems[0].name) {
                const image = {
                    image_id: '111',
                    id: 1,
                    alt: '',
                    src: item.imageItems[0].name,
                    variant_id: [
                        111,
                        204,
                    ]
                };
                imgs.push(image);
            }

        } else {
            const image = {
                image_id: '111',
                id: 1,
                alt: '',
                src: '',
                variant_id: [
                    111,
                    204,
                ]
            };
            imgs.push(image);
        }
        const product: any = {
            id: item.id,
            title: item.name,
            reference: item.reference,
            description: item.description,
            type: '',
            brand: '',
            collection: [],
            category: '',
            price: item.returnedPrice,
            sale: false,
            discount: 0,
            articleVariantsVariantValues: [],
            itemList: [],
            stock: item.shopQuantity,
            new: false,
            images: imgs,
            item
        };
        product.quantity = qty || 1;
        const status = await this.productService.addToCart(product);
        if (status) {
            this.toastrService.success(this.translate.instant('successfully added to your Cart'));
          //  this.router.navigate(['/shop/cart']);
        }
    }
}
