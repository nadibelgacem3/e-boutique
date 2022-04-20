import { Moment } from 'moment';
import { IInvoiceSubscriptionPlan } from './invoice-subscription-plan.model';
import { ICompany } from './company.model';
import { IModule } from './module.model';
import {ISubscriptionPlan} from "./subscription-plan";

export interface IAnnualSubscriptionPlan {
  id?: number;
  startDate?: any;
  endDate?: any;
  numberOfUsers?: number;
  SubscriptionPlan?: ISubscriptionPlan;
  invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan;
}

export class AnnualSubscriptionPlan implements IAnnualSubscriptionPlan {
  constructor(
    public id?: number,
    public startDate?: any,
    public endDate?: any,
    public numberOfUsers?: number,
    public invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan,
  ) {}
}
