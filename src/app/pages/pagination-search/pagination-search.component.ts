import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../shared/classes/product';

@Component({
  selector: 'app-pagination-search',
  templateUrl: './pagination-search.component.html',
  styleUrls: ['./pagination-search.component.scss']
})
export class PaginationSearchComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() paginate: any = {};

  @Output() setPage  : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  pageSet(page: number) {
    this.setPage.emit(page);  // Set Page Number
  }

}
