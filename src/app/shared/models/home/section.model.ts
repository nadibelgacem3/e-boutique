import {IBloc} from "./bloc.model";

export interface ISection {
    id?: number;
    title?: string;
    description?: string;
    display?: boolean;
    blocs?: IBloc[];

}

export class Section implements ISection {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public display?: boolean,
        public blocs?: IBloc[]
    ) {
    }
}
