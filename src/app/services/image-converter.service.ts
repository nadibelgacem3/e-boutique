import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageConverterService {

    constructor(private http: HttpClient) {
    }

    convertImageService(): Observable<any> {
        return this.http.get('assets/images/items/company.png', {responseType: 'blob'});
    }

    convertImageMapsITService(): Observable<any> {
        return this.http.get('assets/images/logo_mapsit.png', {responseType: 'blob'});
    }

    convertImageBackgrounService(): Observable<any> {
        return this.http.get('assets/images/compaktor-pdf.png', {responseType: 'blob'});
    }
    convertImageBackgrounBlancService(): Observable<any> {
        return this.http.get('assets/images/blanc.png', {responseType: 'blob'});
    }


    convertImageUrlService(url: string): Observable<any> {
        return this.http.get(url, {responseType: 'blob'});
    }
}
