import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/guards/auth-guard.guard';
import { AdminAuthGuard } from 'shared/guards/admin-auth.guard';
import { AdminNewProductComponent } from './components/admin-new-product/admin-new-product.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminNewFoodComponent } from './components/admin-new-food/admin-new-food.component';
import { AdminFoodsComponent } from './components/admin-foods/admin-foods.component';

const routes: Routes = [
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },{
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },{
    path: 'admin/products/new',
    component: AdminNewProductComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },{
    path: 'admin/food/new',
    component: AdminNewFoodComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },{
    path: 'admin/foods',
    component: AdminFoodsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AdminRoutingModule { }
