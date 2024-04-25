import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Payment } from '@shared/models/order.model';

@Component({
  selector: 'app-pay-methods',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pay-methods.component.html',
  styleUrl: './pay-methods.component.css'
})
export class PayMethodsComponent {
  @Output() paymentData = new EventEmitter<Payment>();

  private fb =  inject(FormBuilder);

  paymentForm: FormGroup = this.fb.group({
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvv: ['', Validators.required]
  });

  onSubmit() {
    if (!this.paymentForm.valid) return;
    this.paymentData.emit(this.paymentForm.value);
  }

}
