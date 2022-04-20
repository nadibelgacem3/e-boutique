export interface ICurrencyUnitCompanyEnum {
  id?: number;
  currenceUnitName?: string;
  currenceUnitSymbol?: string;
}

export class CurrencyUnitCompanyEnum implements ICurrencyUnitCompanyEnum {
  constructor(public id?: number, public currenceUnitName?: string, public currenceUnitSymbol?: string) {}
}
