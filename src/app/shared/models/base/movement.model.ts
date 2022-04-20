import { Moment } from 'moment';
import { IItem } from './item.model';
import { IBillOperationItem } from './bill-operation-item.model';

export interface IMovement {
  id?: number;
  type?: string;
  reason?: string;
  description?: string;
  date?: Moment;
  billID?: number;
  quantity?: number;
  item?: IItem;
  billOperationItem?: IBillOperationItem;
}

export interface SearchResultIMovement {
  tables: IMovement[];
  total: number;
}

export class Movement implements IMovement {
  constructor(
    public id?: number,
    public type?: string,
    public reason?: string,
    public description?: string,
    public date?: Moment,
    public billID?: number,
    public quantity?: number,
    public item?: IItem,
    public billOperationItem?: IBillOperationItem
  ) {}
}
