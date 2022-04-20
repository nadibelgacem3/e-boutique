export interface IItemCategory {
  id?: number;
  name?: string;
  description?: string;
  articleSubCategories?: any;
}

export class ItemCategory implements IItemCategory {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
