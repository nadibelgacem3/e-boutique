export interface ICompanyLocation {
  id?: number;
  localNumber?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryName?: string;
  flagContentType?: string;
  flag?: any;
}

export class CompanyLocation implements ICompanyLocation {
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
  ) {}
}
