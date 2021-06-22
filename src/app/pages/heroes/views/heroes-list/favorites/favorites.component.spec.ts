import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { Hero } from '../../../models/hero';
import { FavoritesService } from '../../../services/favorites.service';

import { FavoritesComponent } from './favorites.component';

@Component({
  selector: 'app-fav',
  template: '',
})
class FavComponent{
  @Input('active') active:any;
  @Input('hero') hero:any;
}

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favSvc:Partial<FavoritesService>

  let dummyHeroes:Hero[] = [
    {
      id: 123,
      name: 'Dummy Hero',
      thumbnail: 'thumb.jpg'
    }
  ]

  let getFavorites = jasmine.createSpy('getFavorites').and.returnValue(of(dummyHeroes))
  let FavoritesServiceSpy = {
    getFavorites
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavoritesComponent,
        FavComponent,

      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MatIconModule
      ],
      providers: [
        { provide: FavoritesService, useValue: FavoritesServiceSpy }
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    favSvc = TestBed.inject(FavoritesService)
    component = fixture.componentInstance;
    component.favSvc = favSvc as FavoritesService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
