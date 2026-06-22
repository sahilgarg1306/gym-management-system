import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  private router = inject(Router);
  role='';

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
  }
  
  logout() {

    localStorage.clear();

    this.router.navigate(['/login']);
  }
}