import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() {};

    private PUBLIC_URLS = [ 
        `${environment.apiUrl}/signin`, 
        `${environment.apiUrl}/login`
    ];

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.PUBLIC_URLS.includes(request.url)) {
            return next.handle(request);
        }
        
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        const user = JSON.parse(localStorage.getItem('user'));  

        if (user && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: user.token
                }
            });
        }        

        return next.handle(request);
    }
}