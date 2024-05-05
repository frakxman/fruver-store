import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  private authService = inject(AuthService);
  private router = inject(Router);

  user = '';

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user?.name ?? '';
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
