import { FoodService } from "shared/services/food.service";
import { CurrentFoodOrderService } from "shared/services/current-food-order.service";
import { Component, OnInit, Input } from "@angular/core";
import { Food } from "shared/models/food";
import { MatDialog } from "@angular/material/dialog";
import { FoodItemPopupComponent } from "../food-item-popup/food-item-popup.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent {

  @Input() food!: Food;
  @Input() canAdd!: boolean;
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private currentFoodOrderService:CurrentFoodOrderService,
    private foodService: FoodService
    ) {
    
   }

  get photo(): string | undefined {
    return this.food?.images ? this.food?.images[0] : '';
  }
  addToCurrentOrder() {
    this.currentFoodOrderService.addFood(this.food);
    this._snackBar.open("Added to order", "OK", {
      duration: 1000
    });
  }
  openDialog() {
    this.dialog.open(FoodItemPopupComponent, {
      data: {
        food: this.food,
        foodService: this.foodService
      },
    });
  }
}
