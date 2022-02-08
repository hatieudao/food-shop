import { MaterialModule } from "./../material/material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNewProductComponent } from "./components/admin-new-product/admin-new-product.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminNewFoodComponent } from './components/admin-new-food/admin-new-food.component';
import { AdminFoodsComponent } from './components/admin-foods/admin-foods.component';
import { HotToastModule } from "@ngneat/hot-toast";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HotToastModule,
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminNewProductComponent,
    AdminNewFoodComponent,
    AdminFoodsComponent,
  ],
})
export class AdminModule { }
