import {IBloc} from "./bloc.model";

export interface IFooter {
    id?: number;
    logo?: string;
    phone_1?: string;
    code_phone_2?: string;
    email_1?: string;
    email_2?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    blocs?: IBloc[];
}

export class Footer implements IFooter {
    constructor(
        public id?: number,
        public logo?: string,
        public phone_1?: string,
        public code_phone_2?: string,
        public email_1?: string,
        public email_2?: string,
        public facebook?: string,
        public linkedin?: string,
        public twitter?: string,
        public instagram?: string,
        public blocs?: IBloc[]
    ) {
    }
}
