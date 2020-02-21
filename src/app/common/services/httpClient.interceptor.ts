import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpEvent,
    HttpErrorResponse,
    HttpInterceptor,
    HttpHandler,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class HttpClientInterceptorService implements HttpInterceptor {
    token: any;
    result: any;
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).map(
            (result: HttpEvent<any>) => {
                if (result instanceof HttpResponse) {
                    const json = JSON.stringify(result.body);
                    const updatedBody = JSON.parse(json, (key, value) => 
                    {if (key === 'expiryDate' &&  key['expiryDate'] !=null|| key === 'dateProcessed' &&
                      key['dateProcessed'] !=null|| key === 'registrationDate' && 
                       key['registrationDate'] !=null || key === 'invoiceDate' &&
                       key['invoiceDate'] !=null) {
                            return new Date(value);
                        }
                        return value;
                    });
                    result = result.clone({ body: updatedBody });
                }
                return result;
            },
        );
    }
}
