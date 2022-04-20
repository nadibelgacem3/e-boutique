import {Item} from "./item.model";

export interface ITaxItem {
    id?: number;
    name?: string;
    value?: number;
    isActivated?: boolean;
    isFixed?: boolean;
    isPositive?: boolean;
    isPurchase?: boolean;
    isSale?: boolean;
    isBeforeTva?: boolean;
    items?: Item;

}

export class TaxItem implements ITaxItem {
    constructor(
        public id?: number,
        public  name?: string,
        public value?: number,
        public  isActivated?: boolean,
        public   isFixed?: boolean,
        public  isPositive?: boolean,
        public isPurchase?: boolean,
        public  isSale?: boolean,
        public  isBeforeTva?: boolean,
        public items?: Item) {}
}
