import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from '@angular/core';
import { Food } from 'shared/models/food';
import { FoodService } from 'shared/services/food.service';

@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.component.html',
  styleUrls: ['./admin-foods.component.scss']
})
export class AdminFoodsComponent  {
  displayedColumns: string[] = ['photo', 'name', 'price', 'category', 'description', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  foods: Food[] = [];
  constructor(private foodService: FoodService, private _snackBar: MatSnackBar) {
    this.foodService
      .getAllFood()
      .subscribe(data => {
        this.foods = data;
      });
  }
  deleteFood(food: Food){
    this.foodService.deleteFood(food).subscribe(()=>{
      this._snackBar.open('Deleted Product', 'OK', {
        duration: 1000
      })
      window.location.reload();
    });
  }

}
