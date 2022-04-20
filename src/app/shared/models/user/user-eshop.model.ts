import {ICompanyLocation} from './company-location.model';

export interface IUserEshop {
  id?: any;
  firstName?: string;
  lastName?: string;
  phone1?: string;
  phone2?: string;
  cin?: string;
  emailAddress?: string;
  gender?: string;
  commandes?: any;
  addresses?: ICompanyLocation;
}
export interface SearchResultIUserEshop {
  tables: IUserEshop[];
  total: number;
}
export class UserEshop implements IUserEshop {
  constructor(
    public id?: any,
    public firstName?: string,
    public lastName?: string,
    public phone1?: string,
    public phone2?: string,
    public cin?: string,
    public emailAddress?: string,
    public gender?: string,
    public commandes?: any,
    public addresses?: ICompanyLocation,
  ) {}
}
