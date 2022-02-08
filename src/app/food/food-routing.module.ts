import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsComponent } from './components/foods/foods.component';
import { RouterModule, Routes } from '@angular/router';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';



const routes: Routes = [
  {
    path: 'foods',
    component: FoodsComponent,
  },{
    path: 'food/:id',
    component: FoodDetailComponent,
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class FoodRoutingModule { }
