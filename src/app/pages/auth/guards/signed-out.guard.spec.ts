import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

import { SignedOutGuard } from './signed-out.guard';

describe('SignedOutGuard', () => {
  let guard: SignedOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ AuthService ]
    });
    guard = TestBed.inject(SignedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
