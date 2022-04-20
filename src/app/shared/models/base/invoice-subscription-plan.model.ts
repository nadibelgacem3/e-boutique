import { Moment } from 'moment';
import {SubscriptionRenewal} from "./subscription-renewal";

export interface IInvoiceSubscriptionPlan {
  id?: number;
  number?: string;
  reference?: string;
  status?: string;
  date?: any;
  dueDate?: any;
  note?: string;
  subscriptionRenewal?: SubscriptionRenewal;
}

export class InvoiceSubscriptionPlan implements IInvoiceSubscriptionPlan {
  constructor(
    public id?: number,
    public number?: string,
    public reference?: string,
    public status?: string,
    public date?: any,
    public dueDate?: any,
    public note?: string,
    public subscriptionRenewal?: SubscriptionRenewal
  ) {}
}
