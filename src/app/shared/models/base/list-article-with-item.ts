import {IArticle} from "./article";
import {IItem} from "./item.model";


export interface ListArticleWithItem {
    article?: IArticle;
    itemList?: IItem[];
}

export interface SearchResultListArticleWithItem {
    tables: ListArticleWithItem[];
    total: number;
}
