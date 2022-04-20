
import {IItemPriceCategory} from "./item-price";
import {IArticle} from "./article";


export interface IItem {
    id?: string;
    reference?: string;
    name?: string;
    stockQuantity?: number;
    purchaseUnitPrice?: number;
    saleUnitPrice?: number;
    benefitValue?: number;
    stocklimit?: number;
    benefitPercentage?: number;
    returnedPrice?: number;
    purchaseUnitPriceHT?: number;
    itemPriceCategories?: IItemPriceCategory[];
    article?: IArticle;
    tva?: number;
    codeABarre?: string;
    stocklimitMax?: number;
     qty?: number;
    variantValues?: any[];
    imageItems?: any;
    virtualQuantity?: number;
    shopQuantity?: number;
    isFodec?: boolean;
  description?: string;
}

export interface SearchResultIItem {
    tables: IItem[];
    total: number;
}

export class Item implements IItem {
    constructor(
        public id?: string,
        public reference?: string,
        public codeABarre?: string,
        public name?: string,
        public stockQuantity?: number,
        public purchaseUnitPrice?: number,
        public   purchaseUnitPriceHT?: number,
        public saleUnitPrice?: number,
        public   benefitValue?: number,
        public benefitPercentage?: number,
        public  variantValues?: any[],
        public itemPriceCategories?: IItemPriceCategory[],
        public imageItems?: any,
        public virtualQuantity?: number,
        public   shopQuantity?: number
    ) {
    }
}
