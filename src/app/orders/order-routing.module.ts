import { VerifyGuard } from "./../shared/guards/verify.guard";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuard } from 'shared/guards/auth-guard.guard';


const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard, VerifyGuard]
  },{
    path: 'order/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard, VerifyGuard]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OrderRoutingModule { }
