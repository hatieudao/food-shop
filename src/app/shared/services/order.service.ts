import { from, map, Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Order } from "shared/models/orders";
import { FoodService } from "./food.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  private db:any;
  private isAdmin:boolean | undefined= false;

  constructor(
    private userService: UserService,
    ) {
    this.db = getFirestore();
    this.userService.currentUserProfile$.subscribe(val => this.isAdmin = val?.isAdmin);
  }

  getAllOrders(): Observable<Order[] >{
    const colRef = collection(this.db, 'orders');
    return from(getDocs(colRef).then(cols => {
      let res:Order[] = [];
      cols.forEach(col => {
        const {id , userId, createAt, foods, status} = col.data();
        if(status === 'paid') return;
        res?.push({id , userId, createAt, foods, status });
      })
      return res;
    }))
  }
  getOrdersByUserId(userId: string): Observable<Order[]> {
    const colRef = collection(this.db, 'orders');
    const q = query(colRef, where("userId", "==", userId));
    return from(getDocs(q).then( cols => {
      let res:Order[] = [];
      cols.forEach(col => {
        const {id , userId, createAt, foods, status} = col.data();
        res?.push({id , userId, createAt, foods,  status });
      })
      return res;
    }))
  }
  getOrder(id: string): Observable<Order | null> {
    const colRef = collection(this.db, 'foods');
    const q = query(colRef, where("id", "==", id));
    return from(getDocs(q).then(cols => {
      let res:Order | null = null;
      cols.forEach(col => {
        const {id , userId, createAt, foods, status} = col.data();
        res= {id , userId, createAt, foods, status };
      })
      return res;
    }))
  }
  addOrder(order: Order): Observable<any>{
    if(!this.isAdmin){
      return from([]);
    }
    const ref = doc(this.db, 'orders', order.id);
    return from(setDoc(ref, order));
  }
  updateOrder(order: Order): Observable<void> {
    const ref = doc(this.db, 'orders', order.id);
    return from(updateDoc(ref, { ...order }));
  }
  updateStatusOrder(order: Order): Observable<void> {
    console.log(order)
    const ref = doc(this.db, 'orders', order.id);
    if(order.status !== 'pending') return new Observable<void>();
    console.log(order)
    return new Observable<void>()
    // return from(updateDoc(ref, { ...order }));
  }
}
