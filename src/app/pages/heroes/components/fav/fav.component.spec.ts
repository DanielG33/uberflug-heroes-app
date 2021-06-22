import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../services/favorites.service';

import { FavComponent } from './fav.component';
import { Hero } from '../../models/hero';

describe('FavComponent', () => {
  let component: FavComponent;
  let fixture: ComponentFixture<FavComponent>;
  let favSvc: Partial<FavoritesService>;

  let favoritesServiceSpy = {
    addFav: jasmine.createSpy('addFav').and.callFake((hero:Hero) => {
      if(!hero || hero === null)
        return false

      return hero
    }),
    removeFav: jasmine.createSpy('removeFav').and.callFake((id:number = null) => {
      if(id === null)
        return false

      return true
    })
  }

  const dummyHero:Hero = {
    id: 123,
    name: 'dummy hero',
    thumbnail: 'path/to/thumbnail.jpg'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FavComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
      ],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    })
    .compileComponents();

    favSvc = TestBed.inject(FavoritesService);
  });

  beforeEach(() => {    
    fixture = TestBed.createComponent(FavComponent);
    component = fixture.componentInstance;
    component.hero = dummyHero;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input(active) = true', () => {
    beforeEach( () => {
      component.active = true;
    })
    
    it('should be true', () => {
      expect(component.active).toBeTruthy();
    })

    it('should return true on addFav() success', async () => {
      const res = component.toggleFav();
      expect(res).toBeTruthy();
    })
  })

  describe('@Input(active) = false', () => {
    beforeEach( () => {
      component.active = false;
    })

    it('should be false', () => {
      expect(component.active).toBeFalsy();
    })

    it('should return Hero on addFav() success', async () => {
      const res = await component.toggleFav();
      expect(res).toEqual(dummyHero);
    })
  })
});
