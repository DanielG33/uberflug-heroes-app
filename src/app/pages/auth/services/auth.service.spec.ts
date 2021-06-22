import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService - Signed in', () => {
  let service: AuthService;
  let router: Router;

  let dummyUser:any = {
    uid: 'ABC123'
  };

  let RouterSpy = { navigate: jasmine.createSpy('navigate') };
  let AngularFireAuthSpy = {
    authState: of(dummyUser),
    signInWithRedirect: jasmine.createSpy('authState').and.resolveTo(null),
    getRedirectResult: jasmine.createSpy('authState').and.resolveTo({
      user: dummyUser
    }),
    signOut: jasmine.createSpy('authState').and.resolveTo(null),
  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthSpy },
        { provide: Router, useValue: RouterSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dummyUser from Observable<firebaseAuth.authState>', () => {    
    service.checkAuth().subscribe(auth =>{
      expect(auth).toBe(dummyUser)
    })
  })

  it('should return dummyUser from signInWithGoogle', async () => {
    const res = await service.signInWithGoogle();
    expect(res).toEqual(dummyUser)
  })

  it('should redirect to /auth on signOut()', async () => {
    await service.signOut()
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  })
});
