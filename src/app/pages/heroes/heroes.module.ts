import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './views/heroes-list/heroes-list.component';
import { HeroDetailsComponent } from './views/hero-details/hero-details.component';
import { ComicComponent } from './views/hero-details/comic/comic.component';
import { FavComponent } from './components/fav/fav.component';
import { AllComponent } from './views/heroes-list/all/all.component';
import { FavoritesComponent } from './views/heroes-list/favorites/favorites.component';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    HeroDetailsComponent,
    ComicComponent,
    FavComponent,
    AllComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    CarouselModule,
  ]
})
export class HeroesModule { }
