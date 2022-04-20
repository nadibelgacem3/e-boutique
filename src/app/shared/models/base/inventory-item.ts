import {Inventory} from "./inventory";
import {IItem} from "./item.model";


export interface IInventoryItem {
    id?: number;
    newQuantity?: number;
    oldQuantity?: number;
    item?: IItem;
    inventory?: Inventory[];
}

export class InventoryItem implements IInventoryItem {
    constructor(
        public id?: number,
        public newQuantity?: number,
        public oldQuantity?: number,
        public item?: IItem,
        public inventory?: Inventory[]
    ) {}
}
