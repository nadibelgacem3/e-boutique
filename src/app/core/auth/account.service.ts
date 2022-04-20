import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, ReplaySubject} from 'rxjs';
import {SERVER_API_URL} from '../../app.constants';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {StateStorageService} from './state-storage.service';
import {Account} from '../user/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account | null>;

  constructor(private http: HttpClient,
              private stateStorageService: StateStorageService,
              private router: Router) {
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(SERVER_API_URL + 'api/account');
  }

  save(account: any): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/account', account);
  }

  update(account: Account): Observable<{}> {
    return this.http.put(SERVER_API_URL + 'api/account', account);
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap((account: Account | null) => {
          this.authenticate(account);

          // After retrieve the account info, the language will be changed to
          // the user's preferred language configured in the account setting
          /* if (account && account.langKey) {
             const langKey = localStorage.getItem('lang') || account.langKey;
             // this.languageService.changeLanguage(langKey);
           }*/

          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay(),
      );
    }
    return this.accountCache$;
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}
