import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

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
    password: '' 
  };

  currentUser?: User;

  ngOnInit() {
    this.setUserId();
  }

  public userForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

 setUserId(): Observable<number> {
  return this.authService.getAllUsers()
    .pipe(
      map(users => users.length + 1)
    );
  }

  register() {
    if (this.userForm.invalid) return;

    this.setUserId().subscribe(id => {
    this.user = { ...this.userForm.value, id };
    console.log('Registering user', this.user);
    this.authService.register(this.user)
      .subscribe({
        next: (user) => {
          console.log('User created', user);
        },
        error: (err) => {
          console.error('Error creating user', err);
        }
      });
    });
  }

  loging() {
    this.authService.login(this.user.email, this.user.password)
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('User logged in', user);
        },
        error: (err) => {
          console.error('Error logging in', err);
        }
      });
  }

}
