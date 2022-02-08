import { MaterialModule } from "./../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FoodRoutingModule } from "./food-routing.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsComponent } from './components/foods/foods.component';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';



@NgModule({
  declarations: [
    FoodsComponent,
    FoodItemComponent,
    FoodDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FoodRoutingModule,
  ]
})
export class FoodModule { }
