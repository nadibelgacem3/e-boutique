import {IUserEshop} from '../user/user-eshop.model';

export interface IUserEshopLocation {
  id?: number;
  localNumber?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryName?: string;
  flagContentType?: string;
  flag?: any;
  user?: IUserEshop[];
}

export class UserEshopLocation implements IUserEshopLocation {
  constructor(
    public id?: number,
    public localNumber?: string,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public countryName?: string,
    public flagContentType?: string,
    public flag?: any,
    public user?: IUserEshop[]
  ) {
  }
}
