import { IProduct } from '../base/product.model';

export interface ITVAItem {
  id?: number;
  name?: string;
  percentageValue?: number;
  companyID?: number;
  tvaID?: number;
  product?: IProduct;
}

export class TVAItem implements ITVAItem {
  constructor(
    public id?: number,
    public name?: string,
    public percentageValue?: number,
    public companyID?: number,
    public tvaID?: number,
    public product?: IProduct
  ) {}
}
