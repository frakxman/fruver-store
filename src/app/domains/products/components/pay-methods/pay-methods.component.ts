import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay-methods',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pay-methods.component.html',
  styleUrl: './pay-methods.component.css'
})
export class PayMethodsComponent {
  @Output() paymentData = new EventEmitter<any>();

  private fb =  inject(FormBuilder);

  paymentForm: FormGroup = this.fb.group({
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvv: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.paymentForm.valid) return;
    this.paymentData.emit(this.paymentForm.value);
  }

}
