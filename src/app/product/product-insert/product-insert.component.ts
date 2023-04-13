import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
})
export class ProductInsertComponent implements OnDestroy {
  form: FormGroup;
  private subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private service: ProductService) {
    this.form = this.fb.group({
      product: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      cost: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const product = this.form.value as Product;
      this.subscription = this.service
        .insertProduct(product)
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      console.log('Form is not valid');
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
