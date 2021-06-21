import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comic } from '../../../models/comic';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent implements OnInit {

  @Input('comic') comic:Comic;

  @Output('close') close:EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  public emitClose(){
    this.close.emit(true);
  }

}
