import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {SERVER_API_URL} from '../app.constants';


type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({
  providedIn: 'root'
})

export class SlideService {


  public resourceUrl2 = SERVER_API_URL + 'api';

  constructor(protected http: HttpClient) {
  }

  findByUrl(url: string): any  {
      return   this.http.get(`${SERVER_API_URL}api/eshop-schema?hostName=${url}`);
  }
}
