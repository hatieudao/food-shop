import { HomeComponent } from "./components/home/home.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from "./components/products/products.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { LoginComponent } from "./components/login/login.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { MyOrderComponent } from "./components/my-order/my-order.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  pathMatch: 'full',
  },{
    path: 'products',
    component: ProductsComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },{
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },{
    path: 'my/orders',
    component: MyOrderComponent,
    ...canActivate(redirectUnauthorizedToLogin),

  },{
    path: 'check-out',
    component: CheckOutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'sign-up',
    component: SignUpComponent
  },{
    path: 'order-success',
    component: OrderSuccessComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },{
    path: 'admin/products',
    component: AdminProductsComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },{
    path: 'admin/orders',
    component: AdminOrdersComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },{
    path: '**',
    component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
