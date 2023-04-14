import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product, ProductAPI, ProductAPIList } from '../product.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private router: Router) {}

  loading = false;
  productList: Product[] = [];
  private fetchSubscription: Subscription | undefined;
  private deleteSubscription: Subscription | undefined;

  productSortType: 'asc' | 'desc' = 'asc';
  costSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting "findall" API call');
    this.loading = true;
    this.fetchSubscription = this.productService.findAll().subscribe({
      next: (apiData: ProductAPIList) => {
        const { status, data } = apiData;
        this.productList = data;
        console.log(status, data);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
      complete: () => {
        this.loading = false;
        console.log('API call completed');
      },
    });
  }

  toggleSort(key: 'product' | 'cost') {
    let sortKey: 'asc' | 'desc';
    if (key === 'product') {
      this.productSortType = this.productSortType === 'asc' ? 'desc' : 'asc';
      sortKey = this.productSortType;
    } else {
      this.costSortType = this.costSortType === 'asc' ? 'desc' : 'asc';
      sortKey = this.costSortType;
    }

    this.productList = orderBy(this.productList, [key], [sortKey]);
  }

  handleDelete(product: Product) {
    if (
      confirm(
        `Are you sure that you want to delete product "${product.product}"?`
      )
    )
      this.delete(product._id);
  }

  handleUpdate(product: Product) {
    this.router.navigate(['/product/update/' + product._id]);
  }

  private delete(id: string) {
    this.deleteSubscription = this.productService.deleteProduct(id).subscribe({
      next: (apiData: ProductAPI) => {
        const { status, data } = apiData;
        console.log(status, data);
        if (status) {
          this.productList = this.productList.filter((p) => p._id !== id);
        } else {
          console.log('Could not delete product');
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('API call completed');
      },
    });
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }
}
