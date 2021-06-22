import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { AuthService } from '../auth/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let authService;
  let router:Router;
  let route:ActivatedRouteSnapshot;

  let AuthServiceSpy = { }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'auth',
            component: dummyComponent
          }
        ]),
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceSpy }
      ]
    })
    .compileComponents();
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
  });

  beforeEach(() => {
    authService.checkAuth = () => of(true)
    
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be signed in', (done:DoneFn) =>{
    authService.checkAuth().subscribe(res => {
      expect(res).toBeTruthy()
      done();
    })
  })

  it('should sign out and redirect to /auth', () =>{
    authService.signOut = () => {
      authService.checkAuth = () => of(false)
      router.navigate(['/auth'])
    }

    component.signOut();

    authService.checkAuth().subscribe(res => {
      expect(res).toBeFalsy()
      expect(route.url).toHaveBeenCalledOnceWith(['/auth'])
    })
  })

@Component({
  template: ''
})
class dummyComponent{}
  
});
