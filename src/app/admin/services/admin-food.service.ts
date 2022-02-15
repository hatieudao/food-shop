import { Injectable } from '@angular/core';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "@angular/fire/firestore";
import { Food } from "shared/models/food";
import { BehaviorSubject, from, Observable } from "rxjs";
import { deleteDoc, updateDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AdminFoodService {

  private db:any;
  private foodSource:BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);
  private foods : Food[] = [];
  foods$ = this.foodSource.asObservable();
  constructor() {
    this.db = getFirestore();
    this.updateData();
  }
  updateSource(){
    this.foodSource.next(this.foods);
  }
  updateData(){
    const colRef = collection(this.db, 'foods');
    getDocs(colRef).then(cols => {
      let res:Food[] = [];
      cols.forEach(col => {
        const {id , name, price, description, images, category} = col.data();
        res?.push({id , name, price, description, images, category });
      })
      return res;
    }).then(data => {
      this.foods = data;
      this.updateSource();
    })
  }
  filterFoods(type:string){
    if(type === 'all'){
      this.updateSource();
      return;
    }
    this.foodSource.next(this.foods.filter(item => item.category === type));
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
    
    const ref = doc(this.db, 'foods', food.id);
    return from(setDoc(ref, food).then(()=> this.updateData()));
  }
  updateFood(food: Food): Observable<void> {
    
    const ref = doc(this.db, 'foods', food.id);
    return from(updateDoc(ref, { ...food }).then(()=> this.updateData()));
  }
  deleteFood(food: Food): Observable<void>{
    
    const ref = doc(this.db, 'foods', food.id);
    return from(deleteDoc(ref).then(()=> this.updateData()));
  }
  getFoodInstance(id: string): Food | any {
    const colRef = collection(this.db, 'foods');
    const q = query(colRef, where("id", "==", id));
    return  getDocs(q)
      .then(cols => {
        let res:Food | null = null;
        cols.forEach(col => {
          const {id, name, price, description, images, category} = col.data();
          res = {id, name, price, description, images, category };
        })
        return res;
      })
    
  }
}

