import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { Comic } from '../../models/comic';
import { Hero } from '../../models/hero';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  
  @ViewChild('comicsCarousel') comicsCarousel: CarouselComponent;
  
  public hero!:Hero;
  public comics:Comic[] = [];

  public comicDetails:Comic = null;

  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: false,
    navSpeed: 700,
    margin: 12,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    }
  }
  
  constructor(private route: ActivatedRoute, private apiSvc: ApiService) { }

  ngOnInit(): void {
    this.getHero();
    this.getComics();
  }

  private getHero(){
    const id = this.getHeroId();
    this.apiSvc.getHero(id).subscribe( (res:Hero) => {
      this.hero = res;
    })
  }

  private getComics(){
    const heroId = this.getHeroId();
    this.apiSvc.getComics(heroId).subscribe( (res:Comic[]) => {
      this.comics = res;
    })
  }

  private getHeroId(){
    return this.route.snapshot.params.id;
  }

  showComic(comic:Comic = null){
    if(!comic)
      return
    
    this.comicDetails = comic;
  }

}
