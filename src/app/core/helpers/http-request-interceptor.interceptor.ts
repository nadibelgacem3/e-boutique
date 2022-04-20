import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadingService} from '../services/loading.service';
import {catchError, delay, finalize} from 'rxjs/operators';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class HttpRequestInterceptorInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url.includes('eshop-schema')) {
      return next.handle(req);
    }
    if (req.method === 'GET' && req.url.includes('eshop-schema')) {
      return next.handle(req);
    }
    if (req.method === 'DELETE') {
      return next.handle(req);
    }
    if (req.url.includes('checkEmail')) {
      return next.handle(req);
    }
    if (req.url.includes('checkName')) {
      return next.handle(req);
    }
    if (req.url.includes('bank-configs')) {
      return next.handle(req);
    }
    this.loadingService.loading();
    return next.handle(req).pipe(
      delay(1000),
      finalize(() => {
        this.loadingService.idle();
      })
    );
  }
}
