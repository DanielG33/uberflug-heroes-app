import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public keys:any = {};
  
  constructor(public firestore: AngularFirestore) {
  }

  public getFavorites(last:string = '', reverseOrder:boolean = false, limit:number = null):Observable<Hero[]>{
    return this.firestore.collection<Hero>('users/TestingUID/heroes', ref => {
      
      let filtered = ref.orderBy('name', (reverseOrder ? 'desc' : 'asc') )

      if(last !== null)
        filtered = filtered.startAfter(last)
      if(limit !== null)
        filtered = filtered.limit(limit)

      return filtered;
    })
    .valueChanges()
  }

  public getKeys():Observable<any>{
    return this.firestore.collection<Hero>('users/TestingUID/heroes').valueChanges()
    .pipe(
      map(querySnapshot => {
        const keys = querySnapshot.map(doc => [doc.id, true])
        return Object.fromEntries(keys)
      })
    )
  }

  public async addFav(hero:Hero): Promise<Hero | boolean> {
    await this.firestore
      .collection(`users/TestingUID/heroes`)
      .doc(String(hero.id))
      .set({
        ...hero,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    return hero;
  }

  public async removeFav(id:number): Promise<boolean> {
    await this.firestore
      .collection(`users/TestingUID/heroes`)
      .doc(String(id))
      .delete();

    return true
  }
}
