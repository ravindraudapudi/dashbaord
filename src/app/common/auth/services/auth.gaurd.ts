import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, public router: Router) { }

    canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }
}
