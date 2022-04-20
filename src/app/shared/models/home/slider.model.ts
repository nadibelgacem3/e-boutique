import {IBloc} from "./bloc.model";


export interface ISlider {
    id?: number;
    blocs?: IBloc[];
}

export class Slider implements ISlider {
    constructor(
        public id?: number,
        public blocs?: IBloc[],
    ) {
    }
}
