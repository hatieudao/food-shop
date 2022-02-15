import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Food } from 'shared/models/food';
import { FoodService } from 'shared/services/food.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-food-item-popup',
  templateUrl: './food-item-popup.component.html',
  styleUrls: ['./food-item-popup.component.scss']
})
export class FoodItemPopupComponent implements OnInit {

  foodDetailForm= new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(10, [Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    images: new FormControl('')
  })
  menu$;
  food: Food;
  foodService;
  isAdmin:boolean | undefined = false;
  isEdit:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {food: Food, foodService: any},
    private _snackBar: MatSnackBar,
    private userService: UserService) {
      this.food = this.data.food;
      this.foodService = this.data.foodService;
      this.userService
        .currentUserProfile$
        .subscribe(user => this.isAdmin = user?.isAdmin)
      this.foodDetailForm.setValue({
          name: this.food?.name,
          price: this.food?.price,
          description: this.food?.description,
          category: this.food?.category,
          images: this.photo,
        })
      this.menu$ = this.foodService.menu$
      
  }
  ngOnInit(): void {
    this.foodDetailForm.disable();
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
  enableEdit(){
    this.isEdit = true;
    this.foodDetailForm.enable();
  }
  saveChange(){
    this.foodService.updateFood({
      id: this.food.id,
      name: this.foodDetailForm.get('name')?.value,
      price: +(this.foodDetailForm.get('price')?.value),
      description: this.foodDetailForm.get('description')?.value,
      category: this.foodDetailForm.get('category')?.value,
      images: [
        this.foodDetailForm.get('images')?.value
      ]
    } as Food).subscribe(()=>{
      this._snackBar.open("Saved", "OK");
    });
  }
}
