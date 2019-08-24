import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';

import { TokenStorageService } from './token-storage.service';
import { HttpIndicatorService } from './../http-indicator.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
class AuthInterceptor implements HttpInterceptor {

    constructor(
        private tokenStorage: TokenStorageService,
        private httpIndicatorService: HttpIndicatorService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenStorage.token;

        if (token)  {
            req = req.clone({ 
                headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) 
            });
        }
        this.httpIndicatorService.onStarted(req);

        return next.handle(req).pipe(
            finalize(() => this.httpIndicatorService.onFinished(req))
        );
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
