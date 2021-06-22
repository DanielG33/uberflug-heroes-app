import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { HeroDetailsComponent } from './hero-details.component';
import { Comic } from '../../models/comic';

@Component({
  selector: 'app-fav',
  template: '',
})
class FavComponent{
}

@Component({
  selector: 'app-comic',
  template: '',
})
class ComicComponent{
  @Input('comic') comic:any;
}

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetailsComponent, FavComponent, ComicComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return undefined if no comic data provided', () => {
    const res = component.showComic();
    expect(res).toBeFalsy();
  })

  it('should assign comicDetails if comic data provided', () => {
    let dummyComic:Comic = {
      id: 123,
      title: 'Dummy comic',
      thumbnail: 'path/to/thumbnail.jpg',
      description: 'Dummy description',
      modified: new Date(),
      issueNumber: 1,
    };
    
    component.showComic(dummyComic);
    fixture.detectChanges();
    expect(component.comicDetails).toEqual(dummyComic);
  })
});
