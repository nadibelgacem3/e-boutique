import { IProduct } from '../base/product.model';
import { IInvoice } from '../base/invoice.model';

export interface IInvoiceItem {
  id?: number;
  quantity?: number;
  discountRate?: number;
  totalHT?: number;
  totalTVA?: number;
  totaTTC?: number;
  product?: IProduct;
  invoice?: IInvoice;
}

export class InvoiceItem implements IInvoiceItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public discountRate?: number,
    public totalHT?: number,
    public totalTVA?: number,
    public totaTTC?: number,
    public product?: IProduct,
    public invoice?: IInvoice
  ) {}
}
