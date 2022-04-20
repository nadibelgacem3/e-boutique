
export interface IValueVariant {
    id?: number;
    name?: string;
    configVariant?: any;

}

export class ValueVariant implements IValueVariant {
    constructor(public id?: number, public name?: string, public  configVariant?: any) {}
}
