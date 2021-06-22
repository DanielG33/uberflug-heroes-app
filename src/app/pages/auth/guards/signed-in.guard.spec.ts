import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { SignedInGuard } from './signed-in.guard';
import { AuthService } from "../services/auth.service";
import { of } from 'rxjs';

describe('SignedInGuard', () => {
  let guard: SignedInGuard;
  let router: Router;
  let authService;
  
  let AuthSpy = {
    checkAuth: () => of({})
  }
  let RouterSpy = { navigate: jasmine.createSpy('navigate') };

  const route = Object.assign({}, ActivatedRouteSnapshot.prototype, {
    params: {},
    parent: {
      params: {}
    }
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: Router, useValue: RouterSpy },
        { provide: AuthService, useValue: AuthSpy }
      ]
    });
    guard = TestBed.inject(SignedInGuard);
    router = TestBed.inject(Router)
    authService = TestBed.inject(AuthService)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      authService.checkAuth = () => of({
        name: 'Dummy user',
        email: 'dummy@email.com',
        uid: 'ABC123'
      })
    });

    it('should continue', () => {
      guard.canActivate(route, null).subscribe( res => {
        expect(res).toBeTruthy()
      })
    })
  });
  
  describe('when the user is logged out', () => {
    beforeEach(() => {
      authService.checkAuth = () => of(null)
      let router = { navigate: jasmine.createSpy('navigate') };
    });

    it('should redirect to /auth', () => {
      guard.canActivate(route, null).subscribe( res => {
        expect(res).toBeFalsy()
        expect(router).toHaveBeenCalledOnceWith(['/auth'])
      })
    })
  });
});
