import { OrderService } from "./../../../shared/services/order.service";
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Order } from "shared/models/orders";
import { UserService } from "shared/services/user.service";
import { FoodService } from "shared/services/food.service";
import { map, switchMap } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailPopupComponent } from "../order-detail-popup/order-detail-popup.component";
import { Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  displayedColumns: string[] = ['createAt', 'total', 'foods', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  orders!: MatTableDataSource<Order>;
  orders$;
  filter: string = 'all';
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.orders$ = this.orderService.orders$;
    this.orders$.subscribe((data)=>{
      this.orders = new MatTableDataSource(data);
      this.orders.sort = this.sort;
    })
    // this.orderService.getAllOrders()
    // .subscribe(data => {
    //   this.orders = new MatTableDataSource(data);
    //   this.orders.sort = this.sort;
    // })
  }
  
  requestPayment(order:Order){
    if(order.status !== 'request') return;
    order.status = 'pending';
    this.orderService
      .updateStatusOrder({...order })
      .subscribe(()=>{
        this._snackBar.open('Requested', 'OK',{
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
