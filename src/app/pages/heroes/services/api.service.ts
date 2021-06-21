import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "../../../../environments/environment";
import { map } from 'rxjs/operators';
import * as _ from "underscore";

import { Hero, HeroesResponse } from "../models/hero";
import { Observable } from 'rxjs';
import { Comic, ComicsResponse } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL:string = env.api_url;
  private readonly API_KEY:string = env.api_key;

  private heroesQueryConfig:any = {
    nameStartsWith: null,
    orderBy: 'name',
    limit: 12,
    apikey: this.API_KEY,
  };

  constructor(private http: HttpClient) { }

  public getHeroes(params?:any):Observable<Hero[]>{
    
    const queryString = this.buildQS(params);
    const url = `${this.API_URL}/characters?${queryString}`;

    return this.http.get<HeroesResponse>(url)
      .pipe(
        map( res => {
          const characters:Hero[] = this.parseCharacters(res)
          
          // this.heroesQueryConfig.offset = loadingMore ? this.heroesQueryConfig.offset + characters.length : characters.length;

          return characters;
        })
      )
  }

  public getHero(characterId:number):Observable<Hero>{
    const url = `${this.API_URL}/characters/${characterId}?apikey=${this.API_KEY}`;

    return this.http.get<HeroesResponse>(url)
      .pipe(
        map( res => this.parseCharacters(res)[0] )
      )
  }

  public getComics(characterId:number):Observable<Comic[]>{
    const url = `${this.API_URL}/characters/${characterId}/comics?limit=10&apikey=${this.API_KEY}`;
    return this.http.get<ComicsResponse>(url)
      .pipe(
        map( res => this.parseComics(res) )
      )
  }

  public getComic(comicId:number):Observable<Comic>{
    const url = `${this.API_URL}/comics/${comicId}?apikey=${this.API_KEY}`;
    return this.http.get<ComicsResponse>(url)
      .pipe(
        map( res => this.parseComics(res)[0] )
      )
  }
  
  private parseCharacters(res:HeroesResponse):Hero[]{
    const characters:Hero[] = res.data.results.map( ({id, name, thumbnail, description, modified}) => {
      return {
        id,
        name,
        description,
        modified,
        thumbnail: thumbnail.path + '.' + thumbnail.extension,
      }
    })
    return characters;
  }
  
  private parseComics(res:ComicsResponse):Comic[]{
    const comics:Comic[] = res.data.results.map( ({id, title, thumbnail, issueNumber, description, modified}) => {
      return {
        id,
        title,
        thumbnail: thumbnail.path + '.' + thumbnail.extension,
        issueNumber,
        description,
        modified
      }
    })
    return comics;
  }
  
  private buildQS(params:any = {}){
    
    this.heroesQueryConfig.nameStartsWith = params.name;
    this.heroesQueryConfig.orderBy = params.reverseOrder ? '-name' : 'name';
    this.heroesQueryConfig.offset = params.offset;
    
    const paramsArr = [];
    Object.keys(this.heroesQueryConfig)
    .filter(key => this.heroesQueryConfig[key] ) // exclude empty params
    .forEach(key => {
      const val = encodeURIComponent(this.heroesQueryConfig[key]);
      paramsArr.push( [key, val].join('=') );
    })

    const queryString = paramsArr.join('&');
    return queryString;
  }
}
