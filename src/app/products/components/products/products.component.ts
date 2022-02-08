import { Observable } from "rxjs";
import { ProductService } from "shared/services/product.service";
import { Component, OnInit } from '@angular/core';
import { Product } from "shared/models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : Product[] | null = null;
  filter: string = "All";
  categories$;
  constructor(private productService: ProductService) {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    });
    this.categories$ = this.productService.categories$
  }

  ngOnInit(): void {
  }

  onChangeFilter(val: string){
    this.filter = val;
    if(this.filter !== "All"){
      this.productService
        .getProductByCategory(this.filter)
        .subscribe(data => this.products = data)
    }
    else {
      this.productService
        .getAllProduct()
        .subscribe(data => {
        this.products = data;
      });
    }
  }
}
