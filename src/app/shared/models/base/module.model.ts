import { IMonthlySubscriptionPlan } from './monthly-subscription-plan.model';
import { IAnnualSubscriptionPlan } from './annual-subscription-plan.model';
import { IQuarterlySubscriptionPlan } from './quarterly-subscription-plan.model';

export interface IModule {
  id?: number;
  name?: string;
  amount?: number;
  monthlySubscriptionPlans?: IMonthlySubscriptionPlan[];
  annualSubscriptionPlans?: IAnnualSubscriptionPlan[];
  quarterlySubscriptionPlans?: IQuarterlySubscriptionPlan[];
}

export class Module implements IModule {
  constructor(
    public id?: number,
    public name?: string,
    public amount?: number,
    public monthlySubscriptionPlans?: IMonthlySubscriptionPlan[],
    public annualSubscriptionPlans?: IAnnualSubscriptionPlan[],
    public quarterlySubscriptionPlans?: IQuarterlySubscriptionPlan[]
  ) {}
}
