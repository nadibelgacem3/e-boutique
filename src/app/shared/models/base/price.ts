
export interface IPrice {
    id?: number;
    name?: string;
    isActivated?: boolean;
}

export class Price implements IPrice {
    constructor(public id?: number,
                public name?: string,
                public isActivated?: boolean) {

    }
}
