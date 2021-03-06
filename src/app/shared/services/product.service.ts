import { Product } from "shared/models/product";
import { UserService } from "./user.service";
import { Injectable } from '@angular/core';
import { Firestore, getFirestore } from "@angular/fire/firestore";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { BehaviorSubject, from, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private db:any;
  private isAdmin:boolean | undefined= false;
  private productSource :BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private products!: Product[];
  products$: Observable<Product[]> = this.productSource.asObservable();
  constructor(private userService: UserService) {
    this.db = getFirestore();
    this.updateData();
    this.userService.currentUserProfile$.subscribe(val => this.isAdmin = val?.isAdmin);
  }
  updateSource(){
    this.productSource.next(this.products);
  }
  updateData(){
    const colRef = collection(this.db, 'products');
    getDocs(colRef).then(cols => {
      let res:Product[] = [];
      cols.forEach(col => {
        const {id ,title, price, description, photoUrl, category} = col.data();
        res?.push({id ,title, price, description, photoUrl, category });
      })
      return res;
    }).then(data => {
      this.products = data;
      this.updateSource();
    })
  }
  filterProducts(type:string){
    if(type === 'all'){
      this.updateSource();
      return;
    }
    this.productSource.next(this.products.filter(item => item.category === type));
  }
  get categories$(): Observable<any[] | null> {
    const colRef = collection(this.db, 'categories');
    return from(getDocs(colRef).then(cols => {
      let res:any[] = [];
      cols.forEach(col => res.push(col.data()));
      return res;
    }))
  }
  getAllProduct(): Observable<Product[]>{
    const colRef = collection(this.db, 'products');
    return from(getDocs(colRef).then(cols => {
      let res:Product[] = [];
      cols.forEach(col => {
        const {id ,title, price, description, photoUrl, category} = col.data();
        res?.push({id ,title, price, description, photoUrl, category });
      })
      return res;
    }))
  }
  getProductByCategory(category: string): Observable<Product[] | null> {
    const colRef = collection(this.db, 'products');
    const q = query(colRef, where("category", "==", category));
    return from(getDocs(q).then(cols => {
      let res:Product[] | null = [];
      cols.forEach(col => {
        const {id ,title, price, description, photoUrl, category} = col.data();
        res?.push({id ,title, price, description, photoUrl, category });
      })
      return res;
    }))
  }
  getProduct(id: string): Observable<Product | null> {
    const colRef = collection(this.db, 'products');
    const q = query(colRef, where("id", "==", id));
    return from(getDocs(q).then(cols => {
      let res:Product | null = null;
      cols.forEach(col => {
        const {id ,title, price, description, photoUrl, category} = col.data();
        res = {id ,title, price, description, photoUrl, category };
      })
      return res;
    }))
  }
}
