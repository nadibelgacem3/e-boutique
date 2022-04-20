export interface ITiersTypeEnum {
  id?: number;
  tiersTypeName?: string;
}

export class TiersTypeEnum implements ITiersTypeEnum {
  constructor(public id?: number, public tiersTypeName?: string) {}
}
