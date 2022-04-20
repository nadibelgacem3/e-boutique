export interface ISizeEnum {
  id?: number;
  sizeName?: string;
}

export class SizeEnum implements ISizeEnum {
  constructor(public id?: number, public sizeName?: string) {}
}
