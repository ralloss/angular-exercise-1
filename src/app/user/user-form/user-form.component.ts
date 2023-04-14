import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.interfaces';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() submitUser = new EventEmitter<User>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        area: ['', Validators.required],
        road: ['', Validators.required],
      }),
      phone: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    if (this.user === undefined) return this.addPhone();
    this.user.phone.forEach((_) => {
      this.addPhone();
    });

    this.form.patchValue(this.user);
    this.form.get('username')?.disable();
  }

  initPhone(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get phoneControls() {
    return (this.form.get('phone') as FormArray).controls;
  }

  addPhone(): void {
    const phones = this.form.get('phone') as FormArray;
    phones.push(this.initPhone());
  }

  removePhone(index: number): void {
    const phones = this.form.get('phone') as FormArray;
    phones.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const user = this.form.value as User;
      this.submitUser.emit(user);
    } else {
      console.log('Form is not valid');
    }
  }
}
