import {IItem} from './item.model';
import {IBillOperation} from './bill-operation.model';

export interface IBillOperationItem {
    id?: number;
    quantity?: number;
    discountRate?: number;
    tva?: number;
    unitPrice?: number;
    item?: IItem;
    totalHT?: number;
    totalTTC?: number;
    billOperations?: IBillOperation[];
}

export class BillOperationItem implements IBillOperationItem {
    constructor(
        public id?: number,
        public quantity?: number,
        public discountRate?: number,
        public tva?: number,
        public unitPrice?: number,
        public item?: IItem,
        public  totalHT?: number,
        public totalTTC?: number,
        public billOperations?: IBillOperation[]
    ) {
    }
}
