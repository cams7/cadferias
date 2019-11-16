import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from "rxjs";

import { AuthService, Conditional } from '../auth/auth.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkRoles$(route);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkRoles$(route);
  }

  /**
   * Verifica se o usuário tem as roles informada.
   */
  private checkRoles$(route: any) {
    if(route && route.data['roles']) {
      const roles = this.authService.getRoles(<string[]>route.data['roles']);
      const conditional = this.authService.getConditional(<Conditional>route.data['conditional']);

      return this.authService.validateRoles$(roles, conditional).pipe(
        tap(allowed => {
          if(!allowed)
            this.router.navigate(['/invalid-access']);

          /*const message = `Esse usuário ${!allowed?'não ':''}tem permissão de acesso!`;
          if(allowed)
            console.log(message);
          else
            console.error(message);
          if(roles.length > 0)
             console.log(`As seguintes roles foram informadas: "${roles}".`);*/
        }),
        finalize(()=> {/*console.log('Role verificada!')*/})
      );
    }

    return of(false);
  }
}
