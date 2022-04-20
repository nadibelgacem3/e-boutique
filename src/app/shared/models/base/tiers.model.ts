import { ITiersLocation } from './tiers-location.model';
import { ICommercialRegister } from './commercial-register.model';


export interface  ITiers {
  id?: number;
  reference?: string;
  intitule?: string;
  phone1?: string;
  phone2?: string;
  cin?: string;
  imageContentType?: string;
  codePhone1?: string;
  image?: any;
  email?: string;
  type?: string;
  isCustomer?: boolean;
  isSupplier?: boolean;
  name?: string;
  fax?: string;
  isExemptTva?: boolean;
  tiersLocation?: ITiersLocation;
  commercialRegister?: ICommercialRegister;
  isStockSupplier?: boolean;
}

export interface SearchResultITiers {
  tables: ITiers[];
  total: number;
}

export class Tiers implements ITiers {
  constructor(
    public id?: number,
    public reference?: string,
    public intitule?: string,
    public phone1?: string,
    public phone2?: string,
    public cin?: string,
    public imageContentType?: string,
    public image?: any,
    public email?: string,
    public type?: string,
    public isCustomer?: boolean,
    public isSupplier?: boolean,
    public name?: string,
    public fax?: string,
    public tiersLocation?: ITiersLocation,
    public commercialRegister?: ICommercialRegister
  ) {
    this.isCustomer = this.isCustomer || false;
    this.isSupplier = this.isSupplier || false;
  }
}
