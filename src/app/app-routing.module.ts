import { AdminNewProductComponent } from "./admin/components/admin-new-product/admin-new-product.component";
import { AdminAuthGuard} from "shared/guards/admin-auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from "./products/components/products/products.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { LoginComponent } from "./components/login/login.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { AdminProductsComponent } from "./admin/components/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/components/admin-orders/admin-orders.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { MyOrderComponent } from "./components/my-order/my-order.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import {
  AuthGuard,
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ProductDetailComponent } from "./products/components/product-detail/product-detail.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  pathMatch: 'full',
  },{
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },{
    path: 'my/orders',
    component: MyOrderComponent,
    canActivate: [AuthGuard]

  },{
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuard]
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'sign-up',
    component: SignUpComponent
  },{
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard]
  },{
    path: '**',
    component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
