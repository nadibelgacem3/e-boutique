import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/internal/operators';
import {IUser} from './user';
import {ReplaySubject} from 'rxjs';
import {SERVER_API_URL} from '../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  checkEmailExists(email: string, schema: string) {
      const item = {
          email,
          schema
      }
    return this.http.post(`${SERVER_API_URL}api/users/checkMailEshop`, item);
  }

  register(values: any) {
    return this.http.post(`${SERVER_API_URL}api/registerEshopClient`, values).pipe(
      map((user: IUser) => {
        if (user) {
           localStorage.setItem('token', user.id);
          // this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: any) {
    return this.http.post(`${SERVER_API_URL}api/registerEshopClient`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.id_token);
        }
      })
    );
  }
}

