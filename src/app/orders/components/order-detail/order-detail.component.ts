import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from 'shared/services/food.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent  {

  @Input() foodItem!: any;
  constructor() {
  }
}
