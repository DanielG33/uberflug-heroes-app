import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignedOutGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.authService.checkAuth().pipe(
        map((user) => {
          if (user === null)
            return true;
            
          return false;
        }),
        tap((res) => {
          if (!res)
            return this.router.navigate(['/heroes']);
            
          return route;
        })
      );
  }
  
}
