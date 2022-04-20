import {ICompany} from "./company.model";
import {IModule} from "./module.model";
import {ISubscriptionRenewal} from "./subscription-renewal";

export class ISubscriptionPlan {
    id?: number;
    name?: string;
    isMonthly?: boolean;
    isAnnual?: boolean;
    isSemestrial?: boolean;
    isDemo?: boolean;
    startDate?: any;
    endDate?: any;
    company?: ICompany;
    modules?: IModule[];
    subscriptionRenewals?: ISubscriptionRenewal[];
}


export class SubscriptionPlan implements ISubscriptionPlan {
    constructor(
        public id?: number,
        public  name?: string,
        public  isMonthly?: boolean,
        public   isAnnual?: boolean,
        public  isSemestrial?: boolean,
        public isDemo?: boolean,
        public company?: ICompany,
        public modules?: IModule[],
        subscriptionRenewals?: ISubscriptionRenewal[]) {
    }
}
