
import {IUserEshopLocation} from '../eshop/user-eshop-location.model';


export interface IContact {
  id?: number;
  name?: string;
  logo?: string;
  phone1?: string;
  codePhone1?: string;
  phone2?: string;
  codePhone2?: string;
  fax?: string;
  email1?: string;
  description?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  theme?: string;
  companyLocation?: IUserEshopLocation;
  lang?: string;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public name?: string,
    public logo?: string,
    public phone1?: string,
    public codePhone1?: string,
    public phone2?: string,
    public codePhone2?: string,
    public fax?: string,
    public email1?: string,
    public description?: string,
    public email2?: string,
    public facebook?: string,
    public linkedin?: string,
    public twitter?: string,
    public instagram?: string,
    public companyLocation?: IUserEshopLocation
  ) {
  }
}
