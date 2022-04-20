import { Moment } from 'moment';
import { ITiers } from '../base/tiers.model';
import { BankCheckType } from '../../enumerations/bank-check-type.model';
import { BankCheckKind } from '../../enumerations/bank-check-kind.model';

export interface ITiersBankCheck {
  id?: number;
  name?: string;
  bankName?: string;
  number?: string;
  amount?: number;
  dueDate?: Moment;
  bankCheckType?: BankCheckType;
  bankCheckKind?: BankCheckKind;
  swift?: string;
  type?: string;
  tiers?: ITiers;
}

export class TiersBankCheck implements ITiersBankCheck {
  constructor(
    public id?: number,
    public name?: string,
    public bankName?: string,
    public number?: string,
    public amount?: number,
    public dueDate?: Moment,
    public bankCheckType?: BankCheckType,
    public bankCheckKind?: BankCheckKind,
    public swift?: string,
    public type?: string,
    public tiers?: ITiers
  ) {}
}
