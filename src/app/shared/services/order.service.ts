import { BehaviorSubject, from, map, Observable } from "rxjs";
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
  private orderSource: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  private orders: Order[] = [];
  orders$ = this.orderSource.asObservable();
  constructor(
    private userService: UserService,
    ) {
    this.db = getFirestore();
    this.updateData();
    this.userService.currentUserProfile$.subscribe(val => this.isAdmin = val?.isAdmin);
  }
  updateSource(){
    this.orderSource.next(this.orders);
  }
  updateData(){
    const colRef = collection(this.db, 'orders');
    getDocs(colRef).then(cols => {
      let res:Order[] = [];
      cols.forEach(col => {
        const {id , userId, createAt, foods, status, total} = col.data();
        if(status === 'paid') return;
        res?.push({id , userId, createAt, foods, status, total });
      })
      return res;
    }).then(data => {
      this.orders = data;
      this.updateSource();
    })
  }
  getAllOrders(): Observable<Order[] >{
    const colRef = collection(this.db, 'orders');
    return from(getDocs(colRef).then(cols => {
      let res:Order[] = [];
      cols.forEach(col => {
        const {id , userId, createAt, foods, status, total} = col.data();
        if(status === 'paid') return;
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
    return from(updateDoc(ref, { ...order }).then(()=> this.updateData()));
  }
  updateStatusOrder(order: Order): Observable<void> {
    const ref = doc(this.db, 'orders', order.id);
    if(order.status !== 'pending') return new Observable<void>();
    return from(updateDoc(ref, { ...order }).then(()=> this.updateData()));
  }
}
