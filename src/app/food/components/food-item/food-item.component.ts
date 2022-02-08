import { Component, OnInit, Input } from "@angular/core";
import { Food } from "shared/models/food";

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent implements OnInit {

  @Input() food!: Food;
  constructor() {
    
   }

  ngOnInit(): void {
  }
  get photo(): string | undefined{
    return this.food?.images ? this.food?.images[0] : '';
  }
}
