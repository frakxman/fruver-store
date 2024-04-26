import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean => {
    const authService: AuthService = inject( AuthService );
    const router: Router = inject( Router );
    let isAuthenticated = false;

    if ( authService.checkAuhtentication() ) {
        isAuthenticated = true;
        console.log('Authenticated' );
    } else {
        router.navigate(['/auth/login']);
    }
    return isAuthenticated;
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
