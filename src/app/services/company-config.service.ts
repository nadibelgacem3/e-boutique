import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL, SERVER_API_URL_2} from '../app.constants';

import {ICompanyConfig} from '../shared/models/base/company-config.model';

type EntityResponseType = HttpResponse<ICompanyConfig>;
type EntityArrayResponseType = HttpResponse<ICompanyConfig[]>;

@Injectable({providedIn: 'root'})
export class CompanyConfigService {
    public resourceUrl = SERVER_API_URL_2 + 'company-service/api/company-configs';
    public resourceUrl_4 = SERVER_API_URL_2 + 'eshop/api/company-configs';
    public resourceUrl_2 = SERVER_API_URL + 'api/companies';
    public resourceUrl_3 = SERVER_API_URL + 'api/notifications-companies';

    constructor(protected http: HttpClient) {
    }

    create(companyConfig: ICompanyConfig): Observable<EntityResponseType> {
        return this.http.post<ICompanyConfig>(this.resourceUrl, companyConfig, {observe: 'response'});
    }

    creatEshop(companyConfig: ICompanyConfig): Observable<EntityResponseType> {
        return this.http.post<ICompanyConfig>(this.resourceUrl_4, companyConfig, {observe: 'response'});
    }

    update(companyConfig: ICompanyConfig): Observable<EntityResponseType> {
        return this.http.put<ICompanyConfig>(this.resourceUrl, companyConfig, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyConfig>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    findNotifications(id: number) {
        return this.http.get<any>(`${this.resourceUrl_3}/notificationsOneCompany/${id}`, {observe: 'response'});
    }

    checkWeekly(id: number) {
        return this.http.get(`${this.resourceUrl_2}/checkWeekly/${id}`, {observe: 'response'});
    }
    checkProgess(id: number) {
        return this.http.get(`${this.resourceUrl_2}/checkRenewalPending/${id}`, {observe: 'response'});
    }

    checkSubscription(id: number) {
        return this.http.get(`${this.resourceUrl_2}/checkSubscriptionPlan/${id}`, {observe: 'response'});
    }

    findByImage(id: number) {
        return this.http.get<any>(`${this.resourceUrl}/logo/${id}`);
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        return this.http.get<ICompanyConfig[]>(this.resourceUrl, { observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
