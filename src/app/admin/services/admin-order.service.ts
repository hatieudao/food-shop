import { from, map, Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Order } from "shared/models/orders";

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  private db:any;
  constructor() {
    this.db = getFirestore();
  }

  getAllOrders(): Observable<Order[] >{
    const colRef = collection(this.db, 'orders');
    return from(getDocs(colRef).then(cols => {
      let res:Order[] = [];
      cols.forEach(col => {
        const {id , userId, createAt, foods, status, total} = col.data();
        if(status === 'request') return;
        res?.push({id , userId, createAt, foods, status, total });
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
        const {id , userId, createAt, foods, status, total} = col.data();
        res?.push({id , userId, createAt, foods, status, total });
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
        const {id , userId, createAt, foods, status, total} = col.data();
        res= {id , userId, createAt, foods, status, total };
      })
      return res;
    }))
  }
  addOrder(order: Order): Observable<any>{
    const ref = doc(this.db, 'orders', order.id);
    return from(setDoc(ref, order));
  }
  updateOrder(order: Order): Observable<void> {
    const ref = doc(this.db, 'orders', order.id);
    return from(updateDoc(ref, { ...order }));
  }
  updateStatusOrder(order: Order): Observable<void> {
    const ref = doc(this.db, 'orders', order.id);
    if(order.status !== 'paid') return new Observable<void>();
    const foods = order.foods.map(food => ({foodId: food.id, quantity: food.quantity}));
    return from(updateDoc(ref, { ...order, foods }));
  }
}
