import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {SERVER_API_URL_2} from '../app.constants';


type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;
@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  public resourceUrl = SERVER_API_URL_2 + 'company-service/api/shipping-configs';

  constructor(protected http: HttpClient) {}

  create(tva: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

  update(tva: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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
    return this.http.get<any>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<any[]>(this.resourceUrl, {  observe: 'response' }).pipe(
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
}
