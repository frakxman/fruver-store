import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Customer } from '@shared/models/order.model';

@Component({
  selector: 'app-customer-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.css'
})
export class CustomerDataComponent {

  @Output() customerData = new EventEmitter<Customer>();

  private fb = inject( FormBuilder );

  public checkoutForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone: ['', Validators.required]
  });

  onSubmit() {
    if (!this.checkoutForm.valid) return;
      this.customerData.emit(this.checkoutForm.value);
    }

}
