import { OrdersModule } from "./../orders/orders.module";
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
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminStatisticComponent } from './components/admin-statistic/admin-statistic.component';
import { AdminOrderService } from "./services/admin-order.service";
import { SharedModule } from "shared/shared.module";
import { MatNativeDateModule } from "@angular/material/core";
import { AdminUserService } from "./services/admin-user.service";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HotToastModule,
    SharedModule,
    OrdersModule,
    MatNativeDateModule,
    MatSortModule,
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminNewProductComponent,
    AdminNewFoodComponent,
    AdminFoodsComponent,
    AdminUserComponent,
    AdminStatisticComponent,
  ],
  providers:[
    AdminOrderService,
    AdminUserService,
  ]
})
export class AdminModule { }
