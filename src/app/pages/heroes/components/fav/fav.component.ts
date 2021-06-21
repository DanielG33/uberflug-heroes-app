import { HostListener } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { FavoritesService } from "../../services/favorites.service";
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnInit {

  @Input('hero') hero: Hero;
  @Input('active') active: Boolean = false;
  
  constructor(private favSvc: FavoritesService) {
  }

  ngOnInit(): void {
  }

  @HostListener('click')
    async toggleFav(){
      if(this.active){
        console.log('remove Fav')
        await this.favSvc.removeFav(this.hero.id);
        return;
      }
      await this.favSvc.addFav(this.hero);
    }
}
