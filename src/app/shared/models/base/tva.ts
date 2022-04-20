

export interface ITVA {
    id?: number;
    value?: number;
    isActivated?: boolean;

}

export class TVA implements ITVA {
    constructor(
        public id?: number,
        public value?: number,  isActivated?: boolean) {}
}
