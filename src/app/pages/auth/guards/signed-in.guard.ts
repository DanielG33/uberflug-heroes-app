import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignedInGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.authService.checkAuth().pipe(
        map(user => {
          if (user === null)
            return false;

          return true;
        }),
        tap(res => {
          if(!res)
            return this.router.navigate(['/auth']);

          return route;
        })
      );
  }
  
}
