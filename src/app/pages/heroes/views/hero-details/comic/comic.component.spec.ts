import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Comic } from '../../../models/comic';

import { ComicComponent } from './comic.component';

describe('ComicComponent inside a parent component', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHostComponent, ComicComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('if data:Comic received, should create', () => {
    const dummyComic:Comic = {
      id: 123,
      title: 'Dummy comic',
      thumbnail: 'path/to/thumbnail.jpg',
      modified: new Date(),
      issueNumber: 1,
      description: 'Dummy description'
    }

    component.setInput(dummyComic)

    fixture.detectChanges()

    expect(component.comicComponent.comic).toEqual(dummyComic)
  });

@Component({
  selector: `host-component`,
  template: `<app-comic [comic]="input" *ngIf="input" #comicComponent></app-comic>`
})
class TestHostComponent {
  @ViewChild('comicComponent') comicComponent:ComicComponent;
  
  private input: Comic;

  setInput(newInput: Comic) {
    this.input = newInput;
  }
}
  
});

describe('ComicComponent', () => {
  let component: ComicComponent;
  let fixture: ComponentFixture<ComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const dummyComic:Comic = {
      id: 123,
      title: 'Dummy comic',
      thumbnail: 'path/to/thumbnail.jpg',
      modified: new Date(),
      issueNumber: 1,
      description: 'Dummy description'
    }
    
    fixture = TestBed.createComponent(ComicComponent);
    component = fixture.componentInstance;
    component.comic = dummyComic;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit  on close()', () => {
    
    spyOn(component.close, 'emit');
    const nativeElement:HTMLElement = fixture.nativeElement;
    const closeBtn = nativeElement.querySelector('.btn-close');

    closeBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.close.emit).toHaveBeenCalledWith(true);
  });
  
});