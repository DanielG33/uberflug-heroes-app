import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Hero } from '../models/hero';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let angularFirestore: AngularFirestore;

  const date = new Date();
  const input: Hero[] = [
    {
      id: 123,
      name: 'Dummy hero',
      thumbnail: 'path/to/thumbnail.jpg',
      description: 'Dummy description',
      modified: date
    }
  ];

  const data:Observable<Hero> = from(input);

  const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  }

  const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFiresotreStub }
      ]
    });
    service = TestBed.inject(FavoritesService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});