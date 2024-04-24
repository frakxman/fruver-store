import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.css'
})
export class CustomerDataComponent {

  @Output() customerData = new EventEmitter<any>();

  private fb = inject( FormBuilder );
  

  public checkoutForm = this.fb.group({
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
