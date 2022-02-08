import { MaterialModule } from "./../material/material.module";
import { ProductsRoutingModule } from "./products-routing.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductItemComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductsRoutingModule
  ],

})
export class ProductsModule { }
