import { Component, OnInit } from '@angular/core';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'title', 'price', 'category','description', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  products: Product[] = [];

  constructor(private productService: ProductService) { 
      this.productService
        .getAllProduct()
        .subscribe(data => {
          this.products = data;
        })
    }
  ngOnInit(): void {
  }
}
