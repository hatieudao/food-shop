import { OrdersModule } from "./../orders/orders.module";
import { MaterialModule } from "./../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FoodRoutingModule } from "./food-routing.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsComponent } from './components/foods/foods.component';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodItemPopupComponent } from './components/food-item-popup/food-item-popup.component';



@NgModule({
  declarations: [
    FoodsComponent,
    FoodItemComponent,
    FoodDetailComponent,
    FoodItemPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    OrdersModule,
    FoodRoutingModule,
  ]
})
export class FoodModule { }
