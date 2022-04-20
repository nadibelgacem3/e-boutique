
export interface IConfigVariant {
    id?: number;
    name?: string;
}

export class ConfigVariant implements IConfigVariant {
    constructor(public id?: number, public name?: string) {}
}
