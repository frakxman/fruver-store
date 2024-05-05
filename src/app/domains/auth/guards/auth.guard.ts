import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';


const checkAuthStatus = (): Observable<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        return router.parseUrl('/auth/login');
      }
      return isAuthenticated;
    })
  );
};

export const canActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
    // console.log('CanActivate');
    // console.log({ route, state });
    return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
    // console.log('CanMatch');
    // console.log({ route, segments });
    return checkAuthStatus();
};
