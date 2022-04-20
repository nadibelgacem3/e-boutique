

export interface ITaxItem {
  id?: number;
  name?: string;
  isValued?: boolean;
  isPercentage?: boolean;
  value?: number;
  isActivated?: boolean;

}

export class TaxItem implements ITaxItem {
  constructor(
    public id?: number,
    public name?: string,
    public isValued?: boolean,
    public isPercentage?: boolean,
    public value?: number, public isActivated?: boolean

  ) {

  }
}
