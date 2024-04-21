import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  private fb = inject( FormBuilder );
  private authService = inject(AuthService);

  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const user = this.loginForm.value;
    console.log('User logged in', user);
    // TODO: Show loading spinner while waiting for response?
    // this.authService.login(this.loginForm.value)
    //   .subscribe({
    //     next: (user) => {
    //     },
    //     error: () => {
    //     }
    //   });
  }
}
