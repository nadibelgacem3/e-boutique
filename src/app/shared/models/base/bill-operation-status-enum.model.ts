export interface IBillOperationStatusEnum {
  id?: number;
  billOperationStatutName?: string;
}

export class BillOperationStatusEnum implements IBillOperationStatusEnum {
  constructor(public id?: number, public billOperationStatutName?: string) {}
}
