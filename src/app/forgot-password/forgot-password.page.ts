import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Removed DatePipe
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; // Import Location

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class ForgotPasswordPage {
  email: string = '';
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // Method to login page
  navigateToLogin() {
    this.router.navigate(['/login']); 
  }

  async sendPasswordResetEmail() {
    if (!this.email) {
      this.message = 'Please enter your email address.';
      return;
    }

    try {
      await this.authService.sendPasswordResetEmail(this.email);
      this.message = 'Password reset email sent. Please check your inbox.';
    } catch (error) {
      this.message = 'Error sending password reset email. Please try again.';
    }
  }
}
