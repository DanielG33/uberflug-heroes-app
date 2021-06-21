import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignedInGuard } from './pages/auth/guards/signed-in.guard';
import { SignedOutGuard } from './pages/auth/guards/signed-out.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [ SignedOutGuard ]
  },
  {
    path: 'heroes',
    loadChildren: () => import('./pages/heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [ SignedInGuard ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
