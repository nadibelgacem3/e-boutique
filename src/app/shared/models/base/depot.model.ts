import { IItem } from './item.model';

export interface IDepot {
  id?: number;
  name?: string;
  details?: string;
  location?: string;
  items?: IItem[];
}

export class Depot implements IDepot {
  constructor(public id?: number,
              public name?: string,
              public details?: string,
              public location?: string,
              public items?: IItem[]) {}
}
