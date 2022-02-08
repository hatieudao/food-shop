import { Component, OnInit } from '@angular/core';
import { Food } from 'shared/models/food';
import { FoodService } from 'shared/services/food.service';

@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.component.html',
  styleUrls: ['./admin-foods.component.scss']
})
export class AdminFoodsComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'name', 'price', 'category','description', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  foods: Food[] = [];
  constructor(private foodService: FoodService) { 
    this.foodService
      .getAllFood()
      .subscribe(data => {
        this.foods = data;
      })
  }

  ngOnInit(): void {
  }

}
