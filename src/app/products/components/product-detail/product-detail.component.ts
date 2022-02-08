import { ProductService } from "shared/services/product.service";
import { Product } from "shared/models/product";
import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productDetailForm= new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(10, [Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    photoUrl: new FormControl('')
  })
  product: Product | null= null;
  categories$;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
    ) {
      this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.productService.getProduct(id || ''))
      )
      .subscribe(data =>{
        this.product = data;
        this.productDetailForm.setValue({
          title: this.product?.title,
          price: this.product?.price,
          description: this.product?.description,
          category: this.product?.category,
          photoUrl: this.product?.photoUrl,
        })
      })
      this.categories$ = this.productService.categories$
  }

  ngOnInit(): void {
    
  }
  get title(){
    return this.productDetailForm.get('title');
  }
  get price(){
    return this.productDetailForm.get('price');
  }
  get description(){
    return this.productDetailForm.get('description');
  }
  get photoUrl(){
    return this.productDetailForm.get('photoUrl')?.value || 'https://i.ytimg.com/vi/P3FMSDEN8b4/maxresdefault.jpg';
  }
}
