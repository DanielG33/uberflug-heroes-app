import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from '../../services/auth.service';
import firebase from "firebase";

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  let dummyUser:firebase.User | null = {
    uid: 'ABC123'
  } as firebase.User;;
  
  let authServiceSpy = {
    signInWithGoogle: jasmine.createSpy('signInWithGoogle').and.resolveTo(dummyUser)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Log in succesfully', () => {    
    
    beforeEach( () => {
      authService.signInWithGoogle = jasmine.createSpy('signInWithGoogle').and.resolveTo(dummyUser)
    })
    
    it('should return user (Google)', async () => {
      const res = await component.signInWithGoogle();
      expect(res).toBe(dummyUser)
    })
  })

  describe('Log in failure', () => {    
    
    beforeEach( () => {
        authService.signInWithGoogle = jasmine.createSpy('signInWithGoogle').and.resolveTo(null)
    })
    // authServiceSpy = {
    //   signInWithGoogle: jasmine.createSpy('signInWithGoogle').and.resolveTo(null)
    // }

    it('should return null', async () => {
      const res = await component.signInWithGoogle();
      expect(res).toBe(null)
    })
  })

});
