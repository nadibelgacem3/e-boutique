import { Moment } from 'moment';
import { IInvoiceSubscriptionPlan } from './invoice-subscription-plan.model';

export interface IPaymentSubscription {
  id?: number;
  details?: string;
  amount?: number;
  paymentDate?: Moment;
  paymentMethod?: string;
  bankCheckorTraitNumber?: string;
  imageJustifContentType?: string;
  imageJustif?: any;
  invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan;
}

export class PaymentSubscription implements IPaymentSubscription {
  constructor(
    public id?: number,
    public details?: string,
    public amount?: number,
    public paymentDate?: Moment,
    public paymentMethod?: string,
    public bankCheckorTraitNumber?: string,
    public imageJustifContentType?: string,
    public imageJustif?: any,
    public invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan
  ) {}
}
