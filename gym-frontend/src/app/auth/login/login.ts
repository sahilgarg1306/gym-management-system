import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    console.log("I am here");
    if (this.loginForm.invalid) return;
    
    this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: (res: any) => {

          localStorage.setItem(
            'token',
            res.token
          );

          localStorage.setItem(
            'role',
            res.role
          );
          console.log(res.role);
          if(res.role === 'Admin'){
            this.router.navigate(['/admin/dashboard']);
          }
          else if(res.role === 'Instructor'){
            this.router.navigate(['/instructor/dashboard']);
          }
          else{
            this.router.navigate(['/user/dashboard']);
          }
        },

        error: (err) => {
          alert(
            err.error.message ||
            'Login failed'
          );
        }
      });
  }
}