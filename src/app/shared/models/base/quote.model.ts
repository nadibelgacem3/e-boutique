import { Moment } from 'moment';
import { IQuoteItem } from '../base/quote-item.model';
import { ITiers } from '../base/tiers.model';


export interface IQuote {
  id?: number;
  number?: string;
  reference?: string;
  status?: string;
  type?: string;
  totalHT?: number;
  totalTVA?: number;
  totaTTC?: number;
  date?: Moment;
  dueDate?: Moment;
  isConverted?: boolean;
  companyID?: number;
  quoteitems?: IQuoteItem[];
  tiers?: ITiers;
}

export class Quote implements IQuote {
  constructor(
    public id?: number,
    public number?: string,
    public reference?: string,
    public status?: string,
    public type?: string,
    public totalHT?: number,
    public totalTVA?: number,
    public totaTTC?: number,
    public date?: Moment,
    public dueDate?: Moment,
    public isConverted?: boolean,
    public companyID?: number,
    public quoteitems?: IQuoteItem[],
    public tiers?: ITiers
  ) {
    this.isConverted = this.isConverted || false;
  }
}
