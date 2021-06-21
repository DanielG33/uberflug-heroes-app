import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  checkAuth(): Observable<firebase.User | null> {
    return this.auth.authState;
  }

  async signInWithGoogle(): Promise<firebase.User | null> {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithRedirect(provider);

    const res = await this.auth.getRedirectResult();
    return (await this.auth.getRedirectResult()).user;
  }

  async signOut(): Promise<void> {
    try{
      await this.auth.signOut();
      this.router.navigate(['/auth'])
    }catch(err){
      //...
    }
  }
}