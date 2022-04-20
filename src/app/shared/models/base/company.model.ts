import { ITenant } from './tenant.model';

export interface ICompany {
  id?: number;
  companyName?: string;
  tenant?: ITenant;
}

export class Company implements ICompany {
  constructor(public id?: number, public companyName?: string, public tenant?: ITenant) {}
}
