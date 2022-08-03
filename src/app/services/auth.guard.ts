import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


import { Router } from '@angular/router';
import { User } from './../interface/user.model';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  user$: Observable<User> | any;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    console.log("ready login")
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          console.log("nope")
          // Logged out
          return of(null);
        }
      })
    )

    console.log("look");
    this.getUid();
    console.log(this.getUid());
    console.log("look");

    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        console.log(res.uid);
      } else {
        console.log('user not logged in');
      }
    });

  }

  async getUid() {
    return ;
  }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;
    if (!isAuthenticated) {
      alert('You must be authenticated in order to access this page');
    }
    return isAuthenticated;
  }

  async googleSignin() {
    console.log("ready googleSignin")
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    console.log("ready updateUserData")
    console.log(user.uid)
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      myCustomData: "somethign custom"
    }
    return userRef.set(data, { merge: true })
  }

  async signOut() {
    console.log("ready signOut")
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

}
