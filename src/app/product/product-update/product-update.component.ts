import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductAPI } from './../product.interfaces';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
  private fetchSubscription: Subscription | undefined;
  private updateSubscription: Subscription | undefined;
  private id: string | null = null;
  product: Product | undefined;
  error: string | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.fetchProductById(this.id);
    else this.error = 'Id not provided.';
  }

  private fetchProductById(id: string) {
    this.fetchSubscription = this.productService
      .findById(id)
      .subscribe((resp: ProductAPI) => {
        if (resp.status) {
          this.product = resp.data;
          this.error = undefined;
        } else this.error = 'Could not find product.';
      });
  }

  update(product: Product) {
    product._id = this.id!;
    this.updateSubscription = this.productService
      .updateProduct(product)
      .subscribe((resp: ProductAPI) => {
        if (resp.status) {
          console.log('product updated!');
          this.router.navigate(['/product/list'], { replaceUrl: true });
        } else {
          console.log('Could not find product');
        }
      });
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }
}
