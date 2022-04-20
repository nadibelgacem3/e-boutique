import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../shared/classes/product';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() brands: any[] = [];

  @Output() brandsFilter: EventEmitter<any> = new EventEmitter<any>();

  public collapse: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  get filterbyBrand() {
    const uniqueBrands = [];
    this.products.filter((product) => {

      product.tagsProducts.filter((tag) => {
        const index = uniqueBrands.indexOf(tag);
        if (index === -1) {
            uniqueBrands.push(tag);
        }
      })

    })
    return uniqueBrands
  }

  appliedFilter(event) {
    let index = this.brands.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)
      this.brands.push(event.target.value); // push in array cheked value
    else
      this.brands.splice(index,1);  // removed in array unchecked value

    let brands = this.brands.length ? { brand: this.brands.join(",") } : { brand: null };
    this.brandsFilter.emit(brands);
  }

  // check if the item are selected
  checked(item){
    if(this.brands.indexOf(item) != -1){
      return true;
    }
  }

}
