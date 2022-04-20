import { Moment } from 'moment';
import { IBLItem } from '../base/bl-item.model';
import { ITiers } from '../base/tiers.model';


export interface IBL {
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
  blItems?: IBLItem[];
  tiers?: ITiers;
}

export class BL implements IBL {
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
    public blItems?: IBLItem[],
    public tiers?: ITiers
  ) {
    this.isConverted = this.isConverted || false;
  }
}
