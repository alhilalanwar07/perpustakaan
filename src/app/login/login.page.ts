// Add User interface import at the top
import { User } from '../interfaces/user.interface';

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private dbService: DatabaseService,
    private location: Location // Inject Location service
  ) {}

  // Method to navigate to the forgot password page
  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  // Method to navigate back
  goBack() {
    this.location.back();
  }

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      
      if (userCredential.user) {
        const users = await this.dbService.getUsers() as User[]; // Add type assertion
        const currentUser = users.find(u => u.email === this.email);
        
        if (currentUser) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          await this.router.navigate(['/tabs']);
        } else {
          this.errorMessage = 'User not found';
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Invalid password';
      case 'auth/invalid-email':
        return 'Invalid email format';
      default:
        return 'Login failed. Please try again';
    }
  }
}