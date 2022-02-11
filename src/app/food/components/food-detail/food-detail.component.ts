import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Food } from 'shared/models/food';
import { FoodService } from 'shared/services/food.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent {

  foodDetailForm= new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(10, [Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    images: new FormControl('')
  })
  food: Food | null= null;
  menu$;
  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService
    ) {
      this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.foodService.getFood(id || ''))
      )
      .subscribe(data =>{
        this.food = data;
        this.foodDetailForm.setValue({
          name: this.food?.name,
          price: this.food?.price,
          description: this.food?.description,
          category: this.food?.category,
          images: this.photo,
        })
      })
      this.menu$ = this.foodService.menu$
  }

  get name(){
    return this.foodDetailForm.get('name');
  }
  get price(){
    return this.foodDetailForm.get('price');
  }
  get description(){
    return this.foodDetailForm.get('description');
  }
  get photo(): string | undefined{
    return this.food?.images ? this.food?.images[0] : '';
  }

}
