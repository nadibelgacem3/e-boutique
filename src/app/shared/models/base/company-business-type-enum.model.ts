export interface ICompanyBusinessTypeEnum {
  id?: number;
  buisinessTypeName?: string;
}

export class CompanyBusinessTypeEnum implements ICompanyBusinessTypeEnum {
  constructor(public id?: number, public buisinessTypeName?: string) {}
}
