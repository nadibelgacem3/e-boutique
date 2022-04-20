import {Injectable} from '@angular/core';

import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {IPaymentConfig} from "../shared/models/eshop/paymentConfig.model";
import {SERVER_API_URL} from '../app.constants';


type EntityResponseType = HttpResponse<IPaymentConfig>;

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    public resourceUrl = SERVER_API_URL + 'company-service/api/payment-eshop-configs';

    constructor(protected http: HttpClient) {
    }

    query(): Observable<IPaymentConfig[]> {
        return this.http.get<IPaymentConfig[]>(this.resourceUrl).pipe(
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

    update(config: any): Observable<EntityResponseType> {
        return this.http.put<IPaymentConfig>(this.resourceUrl, config, {observe: 'response'});
    }

    create(): Observable<EntityResponseType> {
        return this.http.get<IPaymentConfig>(`${this.resourceUrl}/initPaymentEshopConfig`, { observe: 'response' }).pipe(
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
