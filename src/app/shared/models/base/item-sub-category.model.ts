import { IItemCategory } from './item-category.model';

export interface IItemSubCategory {
  id?: number;
  name?: string;
  description?: string;
  articleCategory?: IItemCategory;
}

export class ItemSubCategory implements IItemSubCategory {
  constructor(public id?: number, public name?: string,
              public description?: string, public articleCategory?: IItemCategory) {}
}
