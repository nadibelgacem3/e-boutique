import { Moment } from 'moment';
import { IBillOperation } from './bill-operation.model';

export interface IInvoicePaymentHistory {
  id?: number;
  details?: string;
  amount?: number;
  paymentDate?: Moment;
  paymentMethod?: string;
  bankCheckorTraitNumber?: string;
  imageJustifContentType?: string;
  imageJustif?: any;
  billOperation?: IBillOperation;
}

export class InvoicePaymentHistory implements IInvoicePaymentHistory {
  constructor(
    public id?: number,
    public details?: string,
    public amount?: number,
    public paymentDate?: Moment,
    public paymentMethod?: string,
    public bankCheckorTraitNumber?: string,
    public imageJustifContentType?: string,
    public imageJustif?: any,
    public billOperation?: IBillOperation
  ) {}
}
