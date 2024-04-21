import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {

  private fb = inject( FormBuilder );
  private authService = inject(AuthService);

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };

  public userForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    if (this.userForm.invalid) {
      return;
    }

    const user: User = this.userForm.value;
    console.log('User created', user);

    // this.authService.register(this.userForm.value)
    //   .subscribe({
    //     next: (user) => {
    //     },
    //     error: (err) => {
    //       console.error('Error creating user', err);
    //     }
    //   });
  }

}
