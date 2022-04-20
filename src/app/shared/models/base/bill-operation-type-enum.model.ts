export interface IBillOperationTypeEnum {
  id?: number;
  billOperationTypeName?: string;
}

export class BillOperationTypeEnum implements IBillOperationTypeEnum {
  constructor(public id?: number, public billOperationTypeName?: string) {}
}
