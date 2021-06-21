import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/services/auth.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  public signOut(){
    this.authSvc.signOut();
  }
}
