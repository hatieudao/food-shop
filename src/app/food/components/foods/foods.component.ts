import { Component, OnInit } from '@angular/core';
import { Food } from 'shared/models/food';
import { FoodService } from 'shared/services/food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent {

  
  foods: Food[] | null = [];
  filter: string = 'All';
  menu$;
  constructor(
    private foodService: FoodService,
  ) {
    this.menu$ = this.foodService.menu$;
    this.foodService
      .getAllFood()
      .subscribe(data => {
        this.foods = data;
      })

  }

 onChangeFilter(val: string){
    this.filter = val;
    if(this.filter !== "All"){
      this.foodService
        .getFoodByCategory(this.filter)
        .subscribe(data => this.foods = data)
    }
    else {
      this.foodService
        .getAllFood()
        .subscribe(data => {
        this.foods = data;
      });
    }
  }
}
