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

  displayedColumns: string[] = ['createAt',  'foods', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  orders!: MatTableDataSource<Order>;
  filter: string = 'All';
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private orderService: OrderService,
    private foodService: FoodService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { 
    this.orderService.getAllOrders()
    // .pipe(
    //   map(data => {
    //     return data.map(order=>{
    //       const foods:any[] = [];
    //       order?.foods.forEach(async(food)=>{
    //         const foodDetail = await this.foodService.getFoodInstance(food.foodId)
    //         foods.push({...foodDetail, quantity: food.quantity});
    //       })
    //       return {...order, foods}
    //     });
    //   }),
    // )
    .subscribe(data => {
      this.orders = new MatTableDataSource(data);
      this.orders.sort = this.sort;
    })
  }
  
  // getTotal(order:any){
  //   return order.foods.reduce((total:any, food:any) => total += food.price * food.quantity, 0)
  // }
  requestPayment(order:any){
    if(order.sataus === 'request') return;
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
