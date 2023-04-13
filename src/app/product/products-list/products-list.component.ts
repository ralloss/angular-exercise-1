import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product, ProductAPIList } from '../product.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  loading = false;
  productList: Product[] = [];
  subscription: Subscription | undefined;

  productSortType: 'asc' | 'desc' = 'asc';
  costSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting "findall" API call');
    this.loading = true;
    this.subscription = this.productService.findAll().subscribe({
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
