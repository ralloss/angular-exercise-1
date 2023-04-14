import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductService } from './product.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'insert', component: ProductInsertComponent },
  { path: 'update/:id', component: ProductUpdateComponent },
];

@NgModule({
  declarations: [
    ProductInsertComponent,
    ProductsListComponent,
    ProductFormComponent,
    ProductUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
