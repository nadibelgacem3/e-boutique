import { Moment } from 'moment';
import { IInvoiceSubscriptionPlan } from './invoice-subscription-plan.model';
import { ICompany } from './company.model';
import { IModule } from './module.model';

export interface IMonthlySubscriptionPlan {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  numberOfUsers?: number;
  invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan;
  company?: ICompany;
  modules?: IModule[];
}

export class MonthlySubscriptionPlan implements IMonthlySubscriptionPlan {
  constructor(
    public id?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public numberOfUsers?: number,
    public invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan,
    public company?: ICompany,
    public modules?: IModule[]
  ) {}
}
