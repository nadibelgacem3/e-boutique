import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../models/auth.models';
import {SERVER_API_URL} from '../../app.constants';

@Injectable({providedIn: 'root'})

export class AuthfakeauthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  // public LoginStatusSubject: BehaviorSubject<boolean>;
  public currentUser: Observable<User>;
  // public LoginStatus: Observable<boolean>;
  private loginStatus = new BehaviorSubject<boolean>(this.chekLogin());

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(login: any) {
    return this.http.post<any>(SERVER_API_URL + 'api/authenticateEshopClient', login)
      .pipe(map(user => {

        // login successful if there's a jwt token in the response
        if (user && user.id_token) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          // localStorage.setItem("username", );
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.clear();
    // sessionStorage.clear();
    this.loginStatus.next(false);
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }

  clearCache() {
    this.currentUser = null;
  }

  chekLogin(): boolean {
    const loginStatus = localStorage.getItem('loginStatus');
    if (loginStatus) {
      return true;
    }
    return false;
  }


  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }
}
