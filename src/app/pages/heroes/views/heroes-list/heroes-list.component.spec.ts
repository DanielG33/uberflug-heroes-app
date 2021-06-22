import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';

import { FavoritesService } from "../../services/favorites.service";
import { HeroesListComponent } from './heroes-list.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fav',
  template: '',
})
class FavComponent{
  @Input('active') active:any;
  @Input('hero') hero:any;
}

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

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
      declarations: [ HeroesListComponent, FavComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MatIconModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: FavoritesService, useValue: FavoritesServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    component.heroes = [];
    component.favorites = {};
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render "{{ heroes.length }} Resultados"', () => {
    let resultsCount:HTMLElement = fixture.nativeElement.querySelector('.resutls-count');
    
    fixture.detectChanges();
    expect(resultsCount.textContent).toContain(`${component.heroes.length} Resultados`);

    // Double check when counter changes
    component.heroes = [
      {
        id: 123,
        name: 'Hero 1',
        thumbnail: 'thumbnail.jpg'
      }
    ]
    fixture.detectChanges();
    expect(resultsCount.textContent).toContain(`${component.heroes.length} Resultados`);
  })

  it('should update component.favorites', fakeAsync(() => {
    expect(component.favorites).toEqual({});
    
    component.getFavorites();
    tick();

    expect(component.favorites).toEqual(dummyFavKeys);
  }))

  it('should update searchForm', () => {
    expect(component.searchForm).toBeTruthy();
    expect(component.searchForm.get('reverseOrder').value).toBeFalse()
    component.switchOrder(true)
    expect(component.searchForm.get('reverseOrder').value).toBeTrue()
  })
});
