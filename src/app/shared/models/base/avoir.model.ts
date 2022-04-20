import { Moment } from 'moment';
import { IAvoirItem } from '../base/avoir-item.model';
import { ITiers } from '../base/tiers.model';


export interface IAvoir {
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
  isConverted?: boolean;
  companyID?: number;
  avoirItems?: IAvoirItem[];
  tiers?: ITiers;
}

export class Avoir implements IAvoir {
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
    public isConverted?: boolean,
    public companyID?: number,
    public avoirItems?: IAvoirItem[],
    public tiers?: ITiers
  ) {
    this.isConverted = this.isConverted || false;
  }
}
