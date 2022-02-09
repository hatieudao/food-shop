import { Product } from "shared/models/product";
import { UserService } from "./user.service";
import { Injectable } from '@angular/core';
import { Firestore, getFirestore } from "@angular/fire/firestore";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { from, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private db:any;
  private isAdmin:boolean | undefined= false;
  constructor(private userService: UserService) {
    this.db = getFirestore();
    this.userService.currentUserProfile$.subscribe(val => this.isAdmin = val?.isAdmin);
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
  addProduct(product: Product): Observable<any>{
    if(!this.isAdmin){
      return from([]);
    }
    const ref = doc(this.db, 'products', product.id);
    return from(setDoc(ref, product));
  
  }
  updateProduct(product: Product): Observable<void> {
    const ref = doc(this.db, 'products', product.id);
    return from(updateDoc(ref, { ...product }));
  }
}
