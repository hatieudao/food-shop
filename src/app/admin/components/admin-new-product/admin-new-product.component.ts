import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { from, map, Observable, pipe, switchMap } from "rxjs";
import { ProductService } from "shared/services/product.service";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { AdminProductService } from "app/admin/services/admin-product.service";
@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.scss']
})
export class AdminNewProductComponent {
  newProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(10, [Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    photoUrl: new FormControl('')
  })
  categories$;
  constructor(
    private productService: AdminProductService,
    private toast: HotToastService,
    private route: Router
    ) {
    this.categories$ = this.productService.categories$
  }
  get title(){
    return this.newProductForm.get('title');
  }

  get price() {
    return this.newProductForm.get('price');
  }
  get description() {
    return this.newProductForm.get('description');
  }
  get photoUrl() {
    return this.newProductForm.get('photoUrl')?.value || 'https://i.ytimg.com/vi/P3FMSDEN8b4/maxresdefault.jpg';
  }
  submit() {
    const {title, price, description, photoUrl, category} = this.newProductForm.value;
    const id =  uuidv4();
    this.productService
      .addProduct({id , title, price, description, photoUrl, category})
      .pipe(map(
        this.toast.observe({
          success: 'Add new product successfully',
          loading: 'Loading...',
          error: ({ message }) => `${message}`,
        }))
      )
      .subscribe(() => this.route.navigate(['/admin/products']));
  }
}
