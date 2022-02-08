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
    AuthGuard
  ]
})
export class SharedModule { }
