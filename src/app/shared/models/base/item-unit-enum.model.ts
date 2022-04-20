export interface IItemUnitEnum {
  id?: number;
  unitName?: string;
}

export class ItemUnitEnum implements IItemUnitEnum {
  constructor(public id?: number, public unitName?: string) {}
}
