import { Injectable } from '@angular/core';

import {HttpClient, HttpResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IUserEshopLocation} from '../shared/models/eshop/user-eshop-location.model';
import {SERVER_API_URL} from '../app.constants';
type EntityArrayResponseTypeAdd = HttpResponse<any[]>;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public resourceUrl_1 = SERVER_API_URL + 'api/governments';
  public resourceUrl_2 = SERVER_API_URL + 'api/delegations';
  public resourceUrl_3 = SERVER_API_URL + 'api/pays';
  public resourceUrl_4 = SERVER_API_URL + 'api/user-eshop-locations';
  constructor(protected http: HttpClient) { }

  query_Governments(req?: any): Observable<EntityArrayResponseTypeAdd> {
    return this.http.get<any[]>(this.resourceUrl_1, {observe: 'response' }).pipe(
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

  query_pays(req?: any): Observable<EntityArrayResponseTypeAdd> {
    return this.http.get<any[]>(this.resourceUrl_3, {observe: 'response' }).pipe(
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

  query_Delegations(req?: any): Observable<EntityArrayResponseTypeAdd> {
    return this.http.get<any[]>(this.resourceUrl_2, {observe: 'response' }).pipe(
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
  update(userShopLocation: IUserEshopLocation): Observable<any> {
    return this.http.put<any>(this.resourceUrl_4, userShopLocation, { observe: 'response' }).pipe(
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

  create(userShopLocation: IUserEshopLocation): Observable<any> {
    return this.http.post<any>(this.resourceUrl_4, userShopLocation, { observe: 'response' }).pipe(
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
    return this.http.get<IUserEshopLocation[]>(this.resourceUrl_4).pipe(
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
