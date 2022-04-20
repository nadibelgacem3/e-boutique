import { IProduct } from '../base/product.model';
import { IAvoir } from '../base/avoir.model';

export interface IAvoirItem {
  id?: number;
  quantity?: number;
  discountRate?: number;
  totalHT?: number;
  totalTVA?: number;
  totaTTC?: number;
  product?: IProduct;
  avoir?: IAvoir;
}

export class AvoirItem implements IAvoirItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public discountRate?: number,
    public totalHT?: number,
    public totalTVA?: number,
    public totaTTC?: number,
    public product?: IProduct,
    public avoir?: IAvoir
  ) {}
}
