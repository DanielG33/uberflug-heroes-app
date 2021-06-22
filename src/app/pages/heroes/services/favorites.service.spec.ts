import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { Hero } from '../models/hero';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let angularFirestore: AngularFirestore;

  const dummyHeroes: Hero[] = [
    {
      id: 123,
      name: 'Dummy hero',
      thumbnail: 'path/to/thumbnail.jpg',
      description: 'Dummy description',
      modified: new Date()
    }
  ];

  const docSpy = jasmine.createSpyObj({
    update: () => jasmine.createSpy('update').and.resolveTo(null),
    set: () => jasmine.createSpy('update').and.resolveTo(null),
    delete: () => jasmine.createSpy('update').and.resolveTo(null),
  })
  
  const collectionSpy = jasmine.createSpyObj({
    valueChanges: of(dummyHeroes),
    doc: docSpy
  })

  const angularFireSpy = jasmine.createSpyObj('AngularFirestore', {
    collection: collectionSpy
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFireSpy }
      ]
    });
    service = TestBed.inject(FavoritesService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Obsrervable<Hero[]> on getFavorites()', () => {
    service.getFavorites().subscribe(res => {
      expect(res).toEqual(dummyHeroes)
    })
  })
  
  it('should return Promise<Hero> on addFav(Hero)', async() => {
      const res = await service.addFav(dummyHeroes[0]);
      expect(res).toBe(dummyHeroes[0]);
  })

  it('should return Promise<true> on removeFav(Number)', async() => {
      const res = await service.removeFav(1);
      expect(res).toBe(true);
  })

});