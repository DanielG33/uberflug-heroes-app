import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { SignedInGuard } from './signed-in.guard';
import { AuthService } from "../services/auth.service";

fdescribe('SignedInGuard', () => {
  let guard: SignedInGuard;
  let routerSpy: Router;
  let authServiceStub: Partial<AuthService>;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/', '/heroes'];

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authServiceStub = {}
    guard = new SignedInGuard(routerSpy, authServiceStub as AuthService);
    
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provice: AuthService, useValue: authServiceStub }
      ]
    });
    guard = TestBed.inject(SignedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when the user is logged in', () => {
    beforeEach(() => {
      authServiceStub.checkAuth = jasmine.createSpy('checkAuth').and.returnValue(true)
    });
  });
  
  describe('when the user is logged out', () => {
    beforeEach(() => {
      authServiceStub.checkAuth = jasmine.createSpy('checkAuth').and.returnValue(false)
    });
  });
});
