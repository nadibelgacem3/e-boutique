import {ITiersLocation} from "./tiers-location.model";
import {ICommercialRegister} from "./commercial-register.model";

export interface ICompanyConfig {
  id?: number;
  name?: string;
  logoContentType?: string;
  logo?: any;
  phone1?: string;
  phone2?: string;
  fax?: string;
  email1?: string;
  email2?: string;
  description?: string;
  businessType?: string;
  currencyUnit?: string;
  currencyQuotient?: number;
  isActivated?: boolean;
  themeColor?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  commercialRegister?: ICommercialRegister;
  companyLocation?: ITiersLocation;
  deductedAtSourceValue?: number;
  deductedAtSourcePercentage?: number;
  codePhone1?: number;
  codePhone2?: number;
  currencyUnitCompany?: any;
}

export class CompanyConfig implements ICompanyConfig {
  constructor(
    public id?: number,
    public name?: string,
    public logoContentType?: string,
    public logo?: any,
    public phone1?: string,
    public phone2?: string,
    public  codePhone1?: number,
    public codePhone2?: number,
    public fax?: string,
    public email1?: string,
    public email2?: string,
    public description?: string,
    public businessType?: string,
    public currencyUnit?: string,
    public currencyQuotient?: number,
    public isActivated?: boolean,
    public themeColor?: string,
    public facebook?: string,
    public linkedin?: string,
    public twitter?: string,
    public instagram?: string,

    public commercialRegister?: ICommercialRegister,
    public companyLocation?: ITiersLocation,
    public  deductedAtSourceValue?: number,
    public deductedAtSourcePercentage?: number

  ) {
    this.isActivated = this.isActivated || false;
  }
}
