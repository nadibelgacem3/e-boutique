import { Injectable } from '@angular/core';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IUserEshop} from '../shared/models/user/user-eshop.model';
import {SERVER_API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserEshopService {
  public resourceUrl = SERVER_API_URL + 'eshop/api/compte-clients';
  constructor(private http: HttpClient) { }


  create(user: IUserEshop): Observable<IUserEshop> {
    return this.http.post<IUserEshop>(this.resourceUrl, user);
  }

  update(user: IUserEshop): Observable<IUserEshop> {
    return this.http.put<IUserEshop>(this.resourceUrl, user);
  }

  find(login: string): Observable<IUserEshop> {
    return this.http.get<IUserEshop>(`${this.resourceUrl}/${login}`);
  }

  query(): Observable<IUserEshop[]> {
    return this.http.get<IUserEshop[]>(this.resourceUrl);
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }
}
