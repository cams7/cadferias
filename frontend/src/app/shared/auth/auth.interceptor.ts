import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, EMPTY } from "rxjs";
import { finalize, catchError } from 'rxjs/operators';

import { TokenStorageService } from './token-storage.service';
import { HttpIndicatorService } from './../http-indicator.service';
import { ErrorsService } from '../errors.service';
import { TOKEN_PREFIX } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private tokenStorage: TokenStorageService,
        private httpIndicatorService: HttpIndicatorService,
        private errorsService: ErrorsService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenStorage.token;

        if (token)  {
            req = req.clone({ 
                headers: req.headers.set(TOKEN_HEADER_KEY, TOKEN_PREFIX + token) 
            });
        }

        //if (!req.headers.has('Content-Type'))
        //    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        
        //req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        this.httpIndicatorService.onStarted(req);

        return next.handle(req).pipe(
            catchError(response => {
                this.errorsService.showError(response);
                return EMPTY;
            }),
            finalize(() => this.httpIndicatorService.onFinished(req))
        );
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];