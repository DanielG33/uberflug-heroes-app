import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { debounceTime } from 'rxjs/operators';
import { Hero } from '../../models/hero';
import { ApiService } from "../../services/api.service";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {

  @ViewChild('heroesScrollArea', {read: InfiniteScrollDirective})
    public heroesScrollArea: InfiniteScrollDirective;
  
  
  public loadingResults:boolean = true;  
  public searchForm:FormGroup;
  public heroes:Hero[] = [];
  public favorites:any = {};

  public isFavorite:boolean = false; // Only and always true if route is /heroes/favorites

  protected shouldResetList:boolean = false;
  
  constructor(private apiSvc: ApiService, public favSvc:FavoritesService) {
  }

  ngOnInit(): void {
    this.buildSearchForm();
    this.getHeroes();
  }

  public getHeroes(offset:number = 0){
    this.loadingResults = true;
    
    if(this.shouldResetList)
      this.resetHeroesScrollArea()
    
    const params = {offset, ...this.searchForm.value};
    
    const subscriber = this.apiSvc.getHeroes(params).subscribe(res => {
      this.heroes = this.shouldResetList ? res : this.heroes.concat(res);
      this.shouldResetList = false;
      this.loadingResults = false;
      subscriber.unsubscribe();
    })
  }

  public getFavorites(){
    this.favSvc.getKeys().subscribe(keys => {
      this.favorites = keys;
    })
  }
  
  private buildSearchForm(){
    this.searchForm = new FormGroup({
      name: new FormControl(),
      reverseOrder: new FormControl(false)
    })

    this.watchSearchFormChanges();
  }

  private watchSearchFormChanges(){
    this.searchForm.valueChanges
      .pipe(
        debounceTime(400)
      ).subscribe( () => {
        this.loadingResults = true;
        this.shouldResetList = true;
        this.getHeroes();
      })
  }

  switchOrder(val:boolean){
    this.searchForm.get('reverseOrder').patchValue(val)
  }

  protected resetHeroesScrollArea(){
    if(!this.heroesScrollArea)
      return;
    
    this.heroesScrollArea.destroyScroller();
    this.heroesScrollArea.setup();
  }
}