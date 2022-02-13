import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { map } from 'rxjs';
import { FoodService } from 'shared/services/food.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-admin-new-food',
  templateUrl: './admin-new-food.component.html',
  styleUrls: ['./admin-new-food.component.scss']
})
export class AdminNewFoodComponent {

   newFoodForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(10, [Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    images: new FormControl('')
  });
  menu$;
  constructor(
    private foodService: FoodService,
    private toast: HotToastService,
    private route: Router
    ) {
    this.menu$ = this.foodService.menu$;
  }

  get name() {
    return this.newFoodForm.get('title');
  }
  get price() {
    return this.newFoodForm.get('price');
  }
  get description() {
    return this.newFoodForm.get('description');
  }
  get photo() {
    console.log(this.newFoodForm.get('images')?.value);
    return this.newFoodForm.get('images')?.value || 'https://i.ytimg.com/vi/P3FMSDEN8b4/maxresdefault.jpg';
  }
  submit() {
    const {name, price, description, images, category} = this.newFoodForm.value;
    const id =  uuidv4();
    this.foodService
      .addFood({id , name, price, description, images: [images], category})
      .pipe(map(
        this.toast.observe({
          success: 'Add new product successfully',
          loading: 'Loading...',
          error: ({ message }) => `${message}`,
        }))
      )
      .subscribe(() => this.route.navigate(['/food', `${id}`]));
  }
}


