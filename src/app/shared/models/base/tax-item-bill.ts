import {Item} from "./item.model";
import {BillOperation} from "./bill-operation.model";

export interface ITaxItemBill {
    id?: number;
    name?: string;
    value?: number;
    isActivated?: boolean;
    isFixed?: boolean;
    isPositive?: boolean;
    isPurchase?: boolean;
    isSale?: boolean;
    taxInvoiceBillOperations?: BillOperation;

}

export class TaxItemBill implements ITaxItemBill {
    constructor(
        public id?: number,
        public value?: number,
        public  isActivated?: boolean,
        public   isFixed?: boolean,
        public  isPositive?: boolean,
        public isPurchase?: boolean,
        public  isSale?: boolean,
        public taxInvoiceBillOperations?: BillOperation) {}
}