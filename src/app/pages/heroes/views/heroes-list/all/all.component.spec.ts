import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from "../../../services/favorites.service";
import { of } from 'rxjs';

import { AllComponent } from './all.component';

describe('AllComponent', () => {
  let component: AllComponent;
  let fixture: ComponentFixture<AllComponent>;

  // Keys of heroes marked as favorites.
  // Data comes from firestore and parsed on FavoritesSerivces.getKeys()
  let dummyFavKeys = {
    '1': true,
    '2': true
  }

  let getKeys = jasmine.createSpy('getKeys').and.returnValue(of(dummyFavKeys))
  let FavoritesServiceSpy = {
    getKeys
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllComponent ],
      imports: [ 
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule,
        MatIconModule
      ],
      providers: [
        { provide: FavoritesService, useValue: FavoritesServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});