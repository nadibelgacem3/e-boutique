import { IProduct } from '../base/product.model';
import { IQuote } from '../base/quote.model';

export interface IQuoteItem {
  id?: number;
  quantity?: number;
  discountRate?: number;
  totalHT?: number;
  totalTVA?: number;
  totaTTC?: number;
  product?: IProduct;
  quote?: IQuote;
}

export class QuoteItem implements IQuoteItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public discountRate?: number,
    public totalHT?: number,
    public totalTVA?: number,
    public totaTTC?: number,
    public product?: IProduct,
    public quote?: IQuote
  ) {}
}
