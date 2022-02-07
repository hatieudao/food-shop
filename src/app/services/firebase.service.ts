import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLogin : boolean = false;
  currentUser$: Observable<User | null> = authState(this.auth);
  constructor(private auth: Auth) { }
  
  login(email:string, password:string): Observable<any>{
    return from( signInWithEmailAndPassword(this.auth, email, password) );
  }
  logout(){
    return from(this.auth.signOut());
  }
  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
}
