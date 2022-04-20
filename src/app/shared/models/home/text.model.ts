import {IBloc} from "./bloc.model";

export interface IText {
    id?: number;
    text?: string;
    bloc?: IBloc;
}

export class Text implements IText {
    constructor(
        public id?: number,
        public text?: string,
        public bloc?: IBloc
    ) {
    }
}
