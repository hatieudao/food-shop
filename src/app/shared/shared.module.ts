import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { CurrentFoodOrderService } from "./services/current-food-order.service";
import { LocalStorageService } from "./services/local-storage.service";
import { OrderService } from "./services/order.service";
import { ProductService } from "shared/services/product.service";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { AuthGuard } from "@angular/fire/auth-guard";
import { FoodService } from "./services/food.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    AuthService, 
    UserService,
    ProductService,
    FoodService,
    OrderService,
    LocalStorageService,
    CurrentFoodOrderService,
    AuthGuard,
    AdminAuthGuard
  ]
})
export class SharedModule { }
