import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from '@angular/core';
import { Food } from 'shared/models/food';
import { FoodService } from 'shared/services/food.service';
import { AdminFoodService } from "app/admin/services/admin-food.service";
import { FoodItemPopupComponent } from "app/food/components/food-item-popup/food-item-popup.component";

@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.component.html',
  styleUrls: ['./admin-foods.component.scss']
})
export class AdminFoodsComponent  {
  displayedColumns: string[] = ['photo', 'name', 'price', 'category', 'description', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  foods: Food[] = [];
  foods$;
  constructor(
    private foodService: AdminFoodService, 
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {
    this.foodService.updateData();
    this.foods$ = this.foodService.foods$;
    this.foods$.subscribe(data => this.foods = data);
  }
  deleteFood(food: Food){
    this.foodService.deleteFood(food).subscribe(()=>{
      this._snackBar.open('Deleted Product', 'OK', {
        duration: 1000
      })
    });
  }
  openDialog(food: Food) {
    this.dialog.open(FoodItemPopupComponent, {
      data: { food, foodService: this.foodService },
    });
  }
}
