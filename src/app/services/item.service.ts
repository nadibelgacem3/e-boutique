import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';


import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {IItem} from '../shared/models/base/item.model';
import {SERVER_API_URL} from '../app.constants';


type EntityResponseType = HttpResponse<IItem>;
type EntityArrayResponseType = HttpResponse<IItem[]>;


@Injectable({ providedIn: 'root' })
export class ItemService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/items';
    public resourceUrl_2 = SERVER_API_URL + 'company-service/api';
  constructor(protected http: HttpClient) {}

  create( item: any): Observable<EntityResponseType> {
    return this.http.post<IItem>(this.resourceUrl,  item,
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

    refreshItemsPriceCategory( item: any): Observable<EntityResponseType> {
        return this.http.post<any>(`${this.resourceUrl}/refreshItemsPriceCategory`,  item,
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

  createItem(item: IItem): Observable<EntityResponseType> {
    return this.http.post<IItem>(this.resourceUrl, item, { observe: 'response' }).pipe(
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

  update(item: IItem): Observable<EntityResponseType> {
    return this.http.put<IItem>(this.resourceUrl, item, { observe: 'response' }).pipe(
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


    stockUp(item: IItem): Observable<EntityResponseType> {
        return this.http.post<IItem>(`${this.resourceUrl}/stockApprovisionnement`, item, { observe: 'response' }).pipe(
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


    validateCommande(items: any[]): any {
        return this.http.post<any[]>(`${this.resourceUrl}/validateCommande`, items, { observe: 'response' }).pipe(
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

    cancelCommande(items: any[]): any {
        return this.http.post<any[]>(`${this.resourceUrl}/cancelCommande`, items, { observe: 'response' }).pipe(
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


    stockOutput(item: IItem): Observable<EntityResponseType> {
        return this.http.post<IItem>(`${this.resourceUrl}/stockDesapprovisionnement`, item, { observe: 'response' }).pipe(
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
    return this.http.get<IItem>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    displayItemInShop(id: number): Observable<EntityResponseType> {
        return this.http.get<IItem>(`${this.resourceUrl}/displayItemInShop/${id}`, { observe: 'response' }).pipe(
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
              title: 'Alert',
              text: '',
          });
          return throwError(e);
        })
    );
  }
    deleteVariant(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/delete/${id}`, { observe: 'response' });
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
    return this.http.get<IItem[]>(this.resourceUrl, { observe: 'response' }).pipe(
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

}
