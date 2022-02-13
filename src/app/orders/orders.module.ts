import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderCurrentComponent } from './components/order-current/order-current.component';
import { OrderRoutingModule } from './order-routing.module';
import { MaterialModule } from "app/material/material.module";
import { OrderDetailPopupComponent } from "./components/order-detail-popup/order-detail-popup.component";
import { MatSortModule } from "@angular/material/sort";



@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
    OrderCurrentComponent,
    OrderDetailPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatSortModule,
    ReactiveFormsModule,
    OrderRoutingModule,
  ],
  exports:[
    OrderCurrentComponent,
    OrderDetailPopupComponent,
    OrderDetailComponent
  ]
})
export class OrdersModule { }
