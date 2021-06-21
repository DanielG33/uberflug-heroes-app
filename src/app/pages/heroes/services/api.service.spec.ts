import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Hero, HeroesResponse } from "../models/hero";
import { Comic, ComicsResponse } from '../models/comic';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes() should return Observable<Hero[]>', () => {
    const date = new Date();
    const dummyHeroesResponse:HeroesResponse = {
      code: 200,
      status: 'Ok',
      data: {
        results: [
          {
            id: 123,
            name: 'Dummy hero',
            description: 'Dummy description',
            modified: date,
            thumbnail: {
              path: 'path/to/thumbnail',
              extension: 'jpg'
            },
            comics: {
              items: [
                {
                  resourceURI: 'https://test.com/comic',
                  name: 'Dummy comic'
                }
              ]
            }
          }
        ]
      }
    }

    const dummyHeroes:Hero[] = [
      {
        id: 123,
        name: 'Dummy hero',
        thumbnail: 'path/to/thumbnail.jpg',
        description: 'Dummy description',
        modified: date,
      }
    ]

    service.getHeroes().subscribe(res => {
      expect(res).toEqual(dummyHeroes)
    })

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=12&apikey=05625341a4b9b4e948b1e3efb1ef0ed6');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroesResponse);

  })

  it('getHero(heroId:number) should return Observable<Hero>', () => {
    const date = new Date();
    const dummyHeroesResponse:HeroesResponse = {
      code: 200,
      status: 'Ok',
      data: {
        results: [
          {
            id: 123,
            name: 'Dummy hero',
            description: 'Dummy description',
            modified: date,
            thumbnail: {
              path: 'path/to/thumbnail',
              extension: 'jpg'
            },
            comics: {
              items: [
                {
                  resourceURI: 'https://test.com/comic',
                  name: 'Dummy comic'
                }
              ]
            }
          }
        ]
      }
    }

    const dummyHero:Hero = {
      id: 123,
      name: 'Dummy hero',
      thumbnail: 'path/to/thumbnail.jpg',
      description: 'Dummy description',
      modified: date,
    }

    service.getHero(123).subscribe(res => {
      expect(res).toEqual(dummyHero)
    })

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/123?apikey=05625341a4b9b4e948b1e3efb1ef0ed6');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroesResponse);
  })

  it('getComics() should return Observable<Comic[]>', () => {
    const date = new Date();
    const dummyComicsResponse:ComicsResponse = {
      code: 200,
      status: 'Ok',
      data: {
        results: [
          {
            id: 123,
            title: 'Dummy comic',
            description: 'Dummy description',
            modified: date,
            issueNumber: 1,
            thumbnail: {
              path: 'path/to/thumbnail',
              extension: 'jpg'
            }
          }
        ]
      }
    }

    const dummyComics:Comic[] = [
      {
        id: 123,
        title: 'Dummy comic',
        thumbnail: 'path/to/thumbnail.jpg',
        description: 'Dummy description',
        modified: date,
        issueNumber: 1,
      }
    ]

    service.getComics(123).subscribe(res => {
      expect(res).toEqual(dummyComics)
    })

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/123/comics?limit=10&apikey=05625341a4b9b4e948b1e3efb1ef0ed6');
    expect(req.request.method).toBe('GET');
    req.flush(dummyComicsResponse);

  })

  it('getComic(comicId:number) should return Observable<Comic>', () => {
    const date = new Date();
    const dummyComicsResponse:ComicsResponse = {
      code: 200,
      status: 'Ok',
      data: {
        results: [
          {
            id: 456,
            title: 'Dummy comic',
            description: 'Dummy description',
            modified: date,
            issueNumber: 1,
            thumbnail: {
              path: 'path/to/thumbnail',
              extension: 'jpg'
            }
          }
        ]
      }
    }

    const dummyComic:Comic = {
      id: 456,
      title: 'Dummy comic',
      thumbnail: 'path/to/thumbnail.jpg',
      description: 'Dummy description',
      modified: date,
      issueNumber: 1,
    }

    service.getComic(456).subscribe(res => {
      expect(res).toEqual(dummyComic)
    })

    const req = httpMock.expectOne('https://gateway.marvel.com/v1/public/comics/456?apikey=05625341a4b9b4e948b1e3efb1ef0ed6');
    expect(req.request.method).toBe('GET');
    req.flush(dummyComicsResponse);

  })
});
