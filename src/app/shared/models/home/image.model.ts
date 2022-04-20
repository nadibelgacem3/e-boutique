import {IBloc} from "./bloc.model";

export interface IImage {
    id?: number;
    image?: string;
    avatar?: string;
    bloc?: IBloc;
}

export class Image implements IImage {
    constructor(
        public id?: number,
        public image?: any,
        public bloc?: IBloc,
        public avatar?: string
    ) {
    }
}
