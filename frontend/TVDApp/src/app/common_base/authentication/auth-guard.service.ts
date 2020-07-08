import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.ListRoles) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/home']);
        return false;
    }
     // authorised so return true
      return false;

  }

    // tslint:disable-next-line: no-unused-expression
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
}
}
