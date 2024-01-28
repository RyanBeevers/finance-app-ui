import { Component } from '@angular/core';
import { AuthService } from '../core-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.scss'
})
export class RegisterAccountComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.signUp(this.email, this.password)
      .then(() => {
        // Navigate to a different route upon successful registration
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.isLoading = false;
        // Handle registration error
        console.error('Registration failed:', error);
        this.errorMessage = 'Failed to create an account.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  registerWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.signInWithGoogle()
      .then(() => {
        // Navigate to a different route upon successful registration with Google
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        // Handle registration with Google error
        this.isLoading = false;
        console.error('Google Sign-In failed:', error);
        this.errorMessage = 'Failed to create an account with Google.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

