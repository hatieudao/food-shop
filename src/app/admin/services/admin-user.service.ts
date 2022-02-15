import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject, from, Observable, of, switchMap } from 'rxjs';
import { UserInfor } from 'shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private db:any;
  private userSource:BehaviorSubject<UserInfor[]> = new BehaviorSubject<UserInfor[]>([]);
  private users!: UserInfor[];
  users$: Observable<UserInfor[]> = this.userSource.asObservable();
  constructor() {
    this.db = getFirestore();
    this.updateData();
  }
  updateSource(){
    this.userSource.next(this.users);
  }
  updateData(){
    const colRef = collection(this.db, 'users');
    getDocs(colRef).then(cols => {
      let res:UserInfor[] = [];
      cols.forEach(col => {
        const {uid, email, displayName, verify, isAdmin} = col.data();
        res?.push({uid, email, displayName, verify, isAdmin });
      })
      return res;
    }).then(data => {
      this.users = data;
      this.updateSource();
    })
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
    return from(setDoc(ref, user).then(()=>this.updateData()));
  }

  updateUser(user: UserInfor): Observable<void> {
    const ref = doc(this.db, 'users', user.uid);
    return from(updateDoc(ref, { ...user }).then(()=>this.updateData()));
  }

  verifyUser(user: UserInfor): Observable<void> {
    const ref = doc(this.db, 'users', user.uid);
    if(user.verify) return new Observable<void>();
    return from(updateDoc(ref, { ...user, verify: true }).then(()=>this.updateData()));
  }

  deleteUser(user: UserInfor){
    const ref = doc(this.db, 'users', user.uid);
    return from(deleteDoc(ref).then(()=>this.updateData()));
  }
}
