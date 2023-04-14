import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.interfaces';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() submitProduct = new EventEmitter<Product>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      product: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      cost: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.product !== undefined) {
      this.form.patchValue(this.product);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const product = this.form.value as Product;
      this.submitProduct.emit(product);
    } else {
      console.log('Form is not valid');
    }
  }
}
