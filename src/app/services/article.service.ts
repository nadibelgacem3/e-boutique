import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';




import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {ItemPriceCategory} from "../shared/models/base/item-price";
import {IArticle} from "../shared/models/base/article";
import {ListArticleWithItem} from "../shared/models/base/list-article-with-item";
import {ItemCategory} from '../shared/models/base/item-category.model';
import {SERVER_API_URL, SERVER_API_URL_2} from '../app.constants';


type EntityResponseType = HttpResponse<IArticle>;
type EntityArrayResponseType = HttpResponse<IArticle[]>;
type EntityArrayResponseType_2 = HttpResponse<ListArticleWithItem[]>;
type EntityResponseTypePrice = HttpResponse<ItemPriceCategory[]>;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public resourceUrl = SERVER_API_URL_2 + 'company-service/api/eshop/articles';
  public resourceUrl_cat = SERVER_API_URL_2 + 'company-service/api/eshop/article-categories';
  public resourceUrl_price = SERVER_API_URL_2 + 'company-service/api/eshop/price-categories';
  public resourceUrl_mark = SERVER_API_URL_2 + 'company-service/api/eshop/marks';
  public resourceUrl_variants = SERVER_API_URL_2 + 'company-service/api/eshop/variants';
  // tslint:disable-next-line:variable-name
  public resourceUrl_eshop = SERVER_API_URL + 'eshop/api/articles';
  // tslint:disable-next-line:variable-name
  public resourceUrl_2 = SERVER_API_URL + 'company-service/api';
  constructor(protected http: HttpClient) {}





  refArticle() {
    return this.http.get<any>(`${this.resourceUrl}/refArticle`, { observe: 'response' }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticle>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  findbyArticle(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticle>(`${this.resourceUrl}/itemsOfArticle/${id}`, { observe: 'response' }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  query(req?: any): Observable<any> {
    return this.http.get<IArticle[]>(this.resourceUrl).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryArticleWithItems(req?: any): Observable<any> {
    return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItems`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }
    filterByMarksCatMinMax(values: string[], valuesMarks: string[], valuesVariants: string[], prices, schemaName): Observable<EntityArrayResponseType_2> {
        let marksList = [];
        if (valuesMarks.length === 0) {
            marksList = null;
        } else {
            marksList = valuesMarks;
        }
        let  subCategoriesList = [];
        if (values.length === 0) {
            subCategoriesList = null;
        } else {
            subCategoriesList = values;
        }

        let  variants = [];
        if (valuesVariants.length === 0) {
            variants = null;
        } else {
            variants = valuesVariants;
        }
        const model = {
            variantValueList: variants,
            markList: marksList,
            subCategoryList: subCategoriesList,
            saleUnitPrices: prices
        };
        return this.http.post<ListArticleWithItem[]>(`${this.resourceUrl}/searchFilter/${schemaName}`, model, { observe: 'response'});
    }
  articlesOfVariantValue(name: string): Observable<EntityArrayResponseType_2> {
    return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/articlesOfVariantValue/${name}`,
      { observe: 'response' }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryArticleWithItemsEshop(schema): Observable<any> {
    return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItemsWithEshopPrice/${schema}`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  findArticleVariantsVariantValues(id, schema): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/findArticleVariantsVariantValues/${id}/${schema}`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryCategoriesEshop(schema): Observable<any> {
    return this.http.get<ItemCategory[]>(`${this.resourceUrl_cat}/${schema}`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }
  maxMinPriceCategory(schema): Observable<any> {
    return this.http.get<any[]>(`${this.resourceUrl_price}/maxMinPriceCategory/${schema}`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
            title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryVariantEshop(schema): Observable<any> {
    return this.http.get<any[]>(`${this.resourceUrl_variants}/${schema}`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryMarksEshop(schema): Observable<any> {
    return this.http.get<ItemCategory[]>(`${this.resourceUrl_mark}/${schema}`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  deleteTax(item: any): Observable<HttpResponse<{}>> {
    return this.http.post<any>(`${this.resourceUrl}/deleteTaxItem`, item , { observe: 'response' }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }
  getAllItems(): Observable<EntityArrayResponseType> {
    return this.http.get<IArticle[]>(this.resourceUrl, { observe: 'response' }).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
           text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  showListPrices(id: number): Observable<ItemPriceCategory[]> {

    return this.http.get<ItemPriceCategory[]>(`${this.resourceUrl_2}/item-price-categories/${id}`);
  }
}
