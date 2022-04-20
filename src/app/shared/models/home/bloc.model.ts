import {IText} from "./text.model";
import {IImage} from "./image.model";
import {ISlider} from "./slider.model";
import {ISection} from "./section.model";
import {IFooter} from "./footer.model";

export interface IBloc {
    id?: number;
    text?: IText;
    image?: IImage;
    slide?: ISlider;
    files?: File[];
    section?: ISection;
    footer?: IFooter;
    isShowImage?: boolean;
    isShowText?: boolean;
    isShowEditButton?: boolean;
    isShowDeleteButton?: boolean;
}

export class Bloc implements IBloc {
    constructor(
        public id?: number,
        public text?: IText,
        public image?: IImage,
        public slide?: ISlider,
        public section?: ISection,
        public footer?: IFooter
    ) {
    }
}
