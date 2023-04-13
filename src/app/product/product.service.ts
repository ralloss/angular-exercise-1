import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductAPI, ProductAPIList } from './product.interfaces';
import { BASE_URL } from '../app.config';
import { delay } from 'rxjs';

const PRODUCT_API = BASE_URL + '/api/product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http
      .get<ProductAPIList>(`${PRODUCT_API}/findAll`)
      .pipe(delay(500));
  }

  findById(id: string) {
    return this.http.get<ProductAPI>(`${PRODUCT_API}/findOne/${id}`);
  }

  insertProduct(product: Product) {
    return this.http.post<ProductAPI>(`${PRODUCT_API}/create`, product);
  }

  updateProduct(product: Product) {
    return this.http.patch<ProductAPI>(`${PRODUCT_API}/update`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<ProductAPI>(`${PRODUCT_API}/delete/${id}`);
  }
}
