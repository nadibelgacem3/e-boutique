import {IConfigVariant} from "./config-variant";
import {IValueVariant} from "./value-variant";


export interface IVariant {
    id?: number;
    configVariant?: IConfigVariant;
    valueVariants?: IValueVariant[];
}

export interface SearchResultIItem {
    tables: IVariant[];
    total: number;
}

export class Variant implements IVariant {
    constructor(
        public id?: number,
        public  configVariant?: IConfigVariant,
        public valueVariants?: IValueVariant[]
    ) {

    }
}
