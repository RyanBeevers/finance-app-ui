import { Component } from '@angular/core';
import { AuthService } from '../core-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.signIn(this.email, this.password)
      .then(() => {
        // Navigate to a different route upon successful login
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        // Handle login error
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  loginWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.signInWithGoogle()
      .then(() => {
        // Navigate to a different route upon successful login with Google
        this.router.navigate(['/view-calendar']);
      })
      .catch(error => {
        // Handle login with Google error
        console.error('Google Sign-In failed:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to login with Google.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

}
