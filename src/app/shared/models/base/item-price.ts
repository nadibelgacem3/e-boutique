import {Item} from "./item.model";
import {Price} from "./price";
import {IVariant, Variant} from "./variant";

export interface IItemPriceCategory {
    id?: number;
    item?: Item;
    prixTTC?: number;
    prixHT?: number;
    priceCategory?: Price;
}

export class ItemPriceCategory implements IItemPriceCategory {
    constructor(public id?: number,
                public item?: Item, public priceCategory?: Price, public prixTTC?: number,  public prixHT?: number) {}
}
