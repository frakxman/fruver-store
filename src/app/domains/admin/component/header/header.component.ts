import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  user = ''

  private router = inject(Router);

  ngOnInit() {
    this.user = localStorage.getItem('user') ?? '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
