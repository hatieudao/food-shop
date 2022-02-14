import { Component, OnInit } from '@angular/core';
import { Food } from 'shared/models/food';
import { AuthService } from 'shared/services/auth.service';
import { FoodService } from 'shared/services/food.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent {

  
  foods: Food[] | null = [];
  filter: string = 'All';
  menu$;
  isLogin:boolean  = false;
  constructor(
    private foodService: FoodService,
    private authService: AuthService,
  ) {
    this.authService.currentUser$.subscribe((user)=>{
      if(user) this.isLogin = true;
      else this.isLogin = false;
    })
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
