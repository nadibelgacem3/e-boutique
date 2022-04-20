import {Moment} from "moment";

import {IInventoryItem} from "./inventory-item";
import {IItem} from './item.model';

export class IInventory {
    id?: number;
    reference?: string;
    dateInventory?: any;
    note?: string;
    userName?: string;
    inventoryItems?: IInventoryItem[];
}

export interface SearchResultIInventory {
    tables: string[];
    total: number;
}


export class Inventory implements IInventory {
    constructor(
        public id?: number,
        public reference?: string,
        public dateInventory?: string,
        public note?: string,
        public inventoryItems?: IInventoryItem[]
    ) {

    }
}
