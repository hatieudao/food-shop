import { CurrentFoodOrderService } from "shared/services/current-food-order.service";
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'app-order-current',
  templateUrl: './order-current.component.html',
  styleUrls: ['./order-current.component.scss']
})
export class OrderCurrentComponent  {

  foodsOrdered$: Observable<any[]> | undefined;
  total: number = 0;
  constructor(private currentFoodOrderService:CurrentFoodOrderService) {
    this.foodsOrdered$ =  this.currentFoodOrderService.food$;
    this.foodsOrdered$
      ?.subscribe(data => {
        this.total = data.reduce((sum, food) => sum += food.price*food.quantity, 0)
      })
  }

  increment(food:any){
    this.currentFoodOrderService.updateFood({...food, quantity: food.quantity + 1})
  }
  decrement(food:any){
    if (food.quantity === 1) return;
    this.currentFoodOrderService
    .updateFood({
      ...food, 
      quantity: food.quantity - 1
    })
  }
  deleteFood(food:any) {
    this.currentFoodOrderService.deleteFood(food);
  }
  totalAType(food:any) {
    return food.quantity*food.price;
  }
  finishOrder(){
    this.currentFoodOrderService.submitOrder();
  }
}
