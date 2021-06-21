import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroDetailsComponent } from './views/hero-details/hero-details.component';
import { AllComponent } from './views/heroes-list/all/all.component';
import { FavoritesComponent } from './views/heroes-list/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    children: [
      {
        path: '',
        component: AllComponent
      },
      {
        path: 'favoritos',
        component: FavoritesComponent
      },
      {
        path: 'detalles/:id',
        component: HeroDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule {
}
