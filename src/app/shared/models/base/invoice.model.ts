import { Moment } from 'moment';
import { IInvoiceItem } from '../base/invoice-item.model';
import { IInvoicePaymentHistory } from '../base/invoice-payment-history.model';
import { ITiers } from '../base/tiers.model';


export interface IInvoice {
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
  companyID?: number;
  invoiceItems?: IInvoiceItem[];
  invoicePaymentHistories?: IInvoicePaymentHistory[];
  tiers?: ITiers;
}

export class Invoice implements IInvoice {
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
    public companyID?: number,
    public invoiceItems?: IInvoiceItem[],
    public invoicePaymentHistories?: IInvoicePaymentHistory[],
    public tiers?: ITiers
  ) {}
}
