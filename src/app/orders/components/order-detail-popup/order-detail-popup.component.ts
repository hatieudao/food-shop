import { OrderService } from "./../../../shared/services/order.service";
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from "@angular/router";
import { map, switchMap } from 'rxjs';
import { FoodService } from 'shared/services/food.service';

@Component({
  selector: 'app-order-detail-popup',
  templateUrl: './order-detail-popup.component.html',
  styleUrls: ['./order-detail-popup.component.scss']
})
export class OrderDetailPopupComponent  {

  displayedColumns: string[] = ['photo', 'name', 'price', 'quantity', 'total'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  orderFoods:any[] = [];
  time;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.time = this.data.createAt;
      this.orderFoods = this.data.foods
    }
  
  get total(){
    return this.orderFoods.reduce((total, food) => total += food.price * food.quantity, 0)
  }
}
