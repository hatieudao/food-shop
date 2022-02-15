import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { UserInfor } from 'shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private db:any;
    constructor() {
      this.db = getFirestore();
    }

  getAllUsers(): Observable<UserInfor[]> {
    const colRef = collection(this.db, 'users');
    return from(getDocs(colRef).then(cols => {
      let res:UserInfor[] = [];
      cols.forEach(col => {
        const {uid, email, displayName, verify, isAdmin} = col.data();
        res?.push({uid, email, displayName, verify, isAdmin });
      })
      return res;
    }))
  }

  addUser(user: UserInfor): Observable<void> {
    const ref = doc(this.db, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: UserInfor): Observable<void> {
    const ref = doc(this.db, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  verifyUser(user: UserInfor): Observable<void> {
    const ref = doc(this.db, 'users', user.uid);
    if(user.verify) return new Observable<void>();
    return from(updateDoc(ref, { ...user, verify: true }));
  }

  deleteUser(user: UserInfor){
    const ref = doc(this.db, 'users', user.uid);
    return from(deleteDoc(ref));
  }
}
