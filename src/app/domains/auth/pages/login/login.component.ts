import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { take } from 'rxjs';

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
  private router = inject(Router)


  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email && password) {
      this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.authService.user$.pipe(
            take(1)
          ).subscribe(user => {
            if(user?.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/cart']);
            }
          });
        },
        error: err => {
          console.error('Login failed', err);
          alert(`Error logging in:\n${err.message}`);
        }
      });
    }
  }

}
