import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from './../product.interfaces';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
})
export class ProductInsertComponent implements OnDestroy {
  private subscription: Subscription | undefined;

  constructor(private service: ProductService) {}

  insert(product: Product) {
    this.subscription = this.service
      .insertProduct(product)
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
