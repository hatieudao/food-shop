import { UserService } from "./user.service";
import { Injectable } from '@angular/core';
import { collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "@angular/fire/firestore";
import { Food } from "shared/models/food";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private db:any;
  private isAdmin:boolean | undefined= false;

  constructor(private userService: UserService) {
    this.db = getFirestore();
    this.userService.currentUserProfile$.subscribe(val => this.isAdmin = val?.isAdmin);
  }

  get menu$(): Observable<any[]> {
    const colRef = collection(this.db, 'menu');
    return from( getDocs(colRef).then(cols => {
      let res:any[] = [];
      cols.forEach(col => res.push(col.data()));
      return res;
    }))
  }
  getAllFood(): Observable<Food[] >{
    const colRef = collection(this.db, 'foods');
    return from(getDocs(colRef).then(cols => {
      let res:Food[] = [];
      cols.forEach(col => {
        const {id , name, price, description, images, category} = col.data();
        res?.push({id , name, price, description, images, category });
      })
      return res;
    }))
  }
  getFoodByCategory(category: string): Observable<Food[]> {
    const colRef = collection(this.db, 'foods');
    const q = query(colRef, where("category", "==", category));
    return from(getDocs(q).then(cols => {
      let res:Food[] = [];
      cols.forEach(col => {
        const {id , name, price, description, images, category} = col.data();
        res?.push({id , name, price, description, images, category });
      })
      return res;
    }))
  }
  getFood(id: string): Observable<Food | null> {
    const colRef = collection(this.db, 'foods');
    const q = query(colRef, where("id", "==", id));
    return from(getDocs(q).then(cols => {
      let res:Food | null = null;
      cols.forEach(col => {
        const {id, name, price, description, images, category} = col.data();
        res = {id, name, price, description, images, category };
      })
      return res;
    }))
  }
  addFood(food: Food): Observable<any>{
    if(!this.isAdmin){
      return from([]);
    }
    const ref = doc(this.db, 'foods', food.id);
    return from(setDoc(ref, food));
  }
  updateFood(food: Food): Observable<void> {
    const ref = doc(this.db, 'products', food.id);
    return from(updateDoc(ref, { ...food }));
  }
}

