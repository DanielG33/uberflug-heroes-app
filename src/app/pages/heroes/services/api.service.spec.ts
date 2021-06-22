import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from "../../../../environments/environment";
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

  describe('Hereos methods', () =>{
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
          },
          {
            id: 456,
            name: 'Second Dummy hero',
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
          },
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
      },
      {
        id: 456,
        name: 'Second Dummy hero',
        thumbnail: 'path/to/thumbnail.jpg',
        description: 'Dummy description',
        modified: date,
      },
    ]
    
    it('should return Observable<Hero[]> on getHeroes(params?)', () => {
  
      service.getHeroes().subscribe(res => {
        expect(res).toEqual(dummyHeroes)
      })

      service.getHeroes({reverseOrder: true}).subscribe(res => {
        expect(res).toEqual(dummyHeroes.reverse())
      })
  
      const req = httpMock.expectOne(`${environment.api_url}/characters?orderBy=name&limit=12&apikey=${environment.api_key}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroesResponse);
  
    })
    
    it('should return Observable<Hero> on getHero(heroId:number)', () => {
      service.getHero(123).subscribe(res => {
        expect(res).toEqual(dummyHeroes[0])
      })
  
      const req = httpMock.expectOne(`${environment.api_url}/characters/123?apikey=${environment.api_key}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroesResponse);
    })
  })

  describe('Comics methods', () =>{
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

    it('getComics() should return Observable<Comic[]>', () => {
  
      service.getComics(123).subscribe(res => {
        expect(res).toEqual(dummyComics)
      })
  
      const req = httpMock.expectOne(`${environment.api_url}/characters/123/comics?limit=10&apikey=${environment.api_key}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyComicsResponse);
  
    })
    
    it('getComic(comicId:number) should return Observable<Comic>', () => {
      service.getComic(456).subscribe(res => {
        expect(res).toEqual(dummyComics[0])
      })
  
      const req = httpMock.expectOne(`${environment.api_url}/comics/456?apikey=${environment.api_key}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyComicsResponse);
    })
  })
});
