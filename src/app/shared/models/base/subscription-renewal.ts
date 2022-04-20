
import { IInvoiceSubscriptionPlan } from './invoice-subscription-plan.model';
import {ISubscriptionPlan} from "./subscription-plan";

export interface ISubscriptionRenewal {
    id?: number;
    startDate?: any;
    endDate?: any;
    numberOfUsers?: number;
    SubscriptionPlan?: ISubscriptionPlan;
    invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan;
}

export class SubscriptionRenewal implements ISubscriptionRenewal {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public numberOfUsers?: number,
        public invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan,
    ) {}
}
