
export interface IImage {
    id?: number;
    name?: string;
    avatar?: string;

}

export class IImage implements IImage {
    constructor(
        public id?: number,
        public name?: string,  avatar?: string) {}
}
