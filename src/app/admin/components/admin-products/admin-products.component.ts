import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  displayedColumns: string[] = ['photo', 'title', 'price', 'category','description', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  products$: Observable<Product[]> = new Observable<Product[]>();
  products!: Product[];
  constructor(private productService: ProductService) { 
    // this.products$ = this.productService.getAllProduct();
      this.productService
        .getAllProduct()
        .subscribe(data => {
          this.products = data;
        })
    }
  deleteProduct(product: Product){
    this.productService.deleteFood(product);
  }
}
