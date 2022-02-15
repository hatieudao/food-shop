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
  foods$;
  constructor(
    private foodService: FoodService,
    private authService: AuthService,
  ) {
    this.authService.currentUser$.subscribe((user)=>{
      if(user) this.isLogin = true;
      else this.isLogin = false;
    })
    this.menu$ = this.foodService.menu$;
    this.foods$ = this.foodService.foods$;

  }

 onChangeFilter(val: string){
    this.filter = val;
    this.foodService.filterFoods(this.filter)
  }
}
