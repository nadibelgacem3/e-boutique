import { IProduct } from '../base/product.model';

export interface IProductMark {
  id?: number;
  name?: string;
  description?: string;
  companyID?: number;
  products?: IProduct[];
}

export class ProductMark implements IProductMark {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public companyID?: number,
    public products?: IProduct[]
  ) {}
}
