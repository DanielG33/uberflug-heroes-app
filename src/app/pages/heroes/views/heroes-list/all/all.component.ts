import { Component } from '@angular/core';
import { HeroesListComponent } from '../heroes-list.component';

@Component({
  templateUrl: '../heroes-list.component.html',
  styleUrls: ['../heroes-list.component.scss']
})
export class AllComponent extends HeroesListComponent {

  ngOnInit(): void {
    super.ngOnInit();
    this.getFavorites();
  }

}
