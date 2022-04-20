import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../app.constants';



type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({
  providedIn: 'root'
})
export class BankConfigService {
  public resourceUrl = SERVER_API_URL + 'api/bank-enums';
  public resourceUrl_2 = SERVER_API_URL + 'company-service/api/bank-configs';
  constructor(protected http: HttpClient) {}

  create(company: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl_2, company, { observe: 'response' });
  }

  update(company: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl_2, company, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl_2}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<any[]>(this.resourceUrl, {  observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl_2}/${id}`, { observe: 'response' });
  }
}
