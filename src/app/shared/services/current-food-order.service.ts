import { LocalStorageService } from "./local-storage.service";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { OrderService } from "./order.service";
import { Order } from "shared/models/orders";
import { UserService } from "./user.service";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CurrentFoodOrderService {
  private static keyStorage:string = "CurrentOrder";
  private foodSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private foods!: any[];
  food$: Observable<any[]> = this.foodSource.asObservable();
  
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private localStorageService: LocalStorageService) {
    this.fetchFromLocalStorage();
  }
  private updateSource(){
    this.foodSource.next(this.foods);
  }
  private updateStorage(){
    const key = CurrentFoodOrderService.keyStorage;
    this.localStorageService.setObject(key, this.foods);
    this.updateSource();
  }
  fetchFromLocalStorage(){
    const key = CurrentFoodOrderService.keyStorage;
    this.foods = this.localStorageService.getValue(key) || [];
    this.updateSource();
  }
  addFood(food:any){
    const pos = this.foods.findIndex(item => item.id === food.id)
    if(pos === -1){
      this.foods.push({...food, quantity: 1});
    }else{
      this.foods[pos].quantity += 1;
    }
    this.updateStorage();
  }
  updateFood(food:any){
    const pos = this.foods.findIndex(item => item.id === food.id)
    if(pos === -1){
      this.foods.push({...food, quantity: 1});
    }else{
      this.foods[pos] = food;
    }
    this.updateStorage();
  }
  deleteFood(food:any){
    this.foods = this.foods.filter(item => food.id !== item.id)
    this.updateStorage();
  }
  submitOrder(){
    this.orderService.addOrder({
      id: uuidv4(),
      createAt: new Date(),
      userId: this.userService.userId,
      foods: this.foods,
      status: 'request',
      total: this.foods.reduce((total, item)=> total += item.price*item.quantity, 0)
    } as Order)
    this.foods = [];
    this.updateStorage();
  }
}
