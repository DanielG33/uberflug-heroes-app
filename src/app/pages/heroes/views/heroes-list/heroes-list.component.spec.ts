import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let resultsCount: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    resultsCount = fixture.nativeElement.querySelector('.resutls-count');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('heroes count should render "{{ heroes.length }} Resultados "', () => {
    expect(resultsCount.textContent).toContain(`${component.heroes.length} Resultados`);
  })
});
