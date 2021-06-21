import { Component } from '@angular/core';
import { HeroesListComponent } from '../heroes-list.component';

@Component({
  templateUrl: '../heroes-list.component.html',
  styleUrls: ['../heroes-list.component.scss']
})
export class FavoritesComponent extends HeroesListComponent {

  public isFavorite:boolean = true; // Only and always true if route is /heroes/favorites
  
  public getHeroes(offset:number = 0){
    // To do: fix infinite scroll to automatically run if there's no overflow
    // Until fix: display all the favorites at once
    
    let reverseOrder = this.searchForm.get('reverseOrder').value
    this.favSvc.getFavorites(null, reverseOrder, null).subscribe(res => {
      this.heroes = res;
      this.loadingResults = false;
    })
    
    //******************************************//
    // this.loadingResults = true;
    // let last = '';

    // if(!this.shouldResetList && offset > 0)
    //   last = this.heroes[offset - 1].name;

    // let favoritesSubscriber = this.favSvc.getFavorites(last).subscribe(res => {
    //   this.heroes = this.shouldResetList ? res : this.heroes.concat(res);
    //   this.shouldResetList = false;
    //   this.loadingResults = false;
    //   favoritesSubscriber.unsubscribe();
    // })

    // if(this.shouldResetList)
    //   this.resetHeroesScrollArea()
    //******************************************//
  }
}
