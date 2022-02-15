import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminProductService } from 'app/admin/services/admin-product.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  displayedColumns: string[] = ['photo', 'title', 'price', 'category','description', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  products!: Product[];
  product$;
  constructor(private productService: AdminProductService, private _snackBar: MatSnackBar,) { 
      this.product$ = this.productService.products$;
      this.product$.subscribe(data => this.products = data);
    }
  deleteProduct(product: Product){
    this.productService.deleteProduct(product).subscribe(()=>{
      this._snackBar.open('Deleted Product', 'OK', {
        duration: 1000
      })
    });
  }
}
