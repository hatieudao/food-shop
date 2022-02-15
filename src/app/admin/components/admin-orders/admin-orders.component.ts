import { OrderService } from "./../../../shared/services/order.service";
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Order } from "shared/models/orders";
import { UserService } from "shared/services/user.service";
import { FoodService } from "shared/services/food.service";
import { map, switchMap } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OrderDetailPopupComponent } from "app/orders/components/order-detail-popup/order-detail-popup.component";
import { AdminOrderService } from "app/admin/services/admin-order.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  displayedColumns: string[] = ['createAt', 'total', 'foods', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  orders!: MatTableDataSource<Order>;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private orderService: AdminOrderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.orderService.getAllOrders()
    .subscribe(data => {
      this.orders = new MatTableDataSource(data);
      this.orders.sort = this.sort;
    })
  }
  
  getTotal(order:any){
    return order.foods.reduce((total:any, food:any) => total += food.price * food.quantity, 0)
  }
  requestPayment(order:any){
    if(order.sataus === 'pending') return;
    order.status = 'paid';
    this.orderService
      .updateStatusOrder(order)
      .subscribe(()=>{
        this._snackBar.open('Paid', 'OK',{
          duration: 1000
        });
      });
  }
  
  openDialog(order:any) {
    this.dialog.open(OrderDetailPopupComponent, {
      data: order
    });
  }

}
