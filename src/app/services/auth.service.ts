import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { DatabaseService } from './database.service'; // Ensure DatabaseService is imported

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private dbService: DatabaseService // Inject DatabaseService here
  ) {}

  // Login with email/password
  async login(email: string, password: string): Promise<User | null> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (result.user) {
        // Fetch additional user data from Firestore using email
        const users = await this.dbService.getUsers();
        const userData = users.find((user: User) => user.email === email); // Ensure User type is used
        if (userData) {
          return userData;
        }
      }
      return null;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userData = await this.dbService.getUser(user.uid);
        return userData || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Check authentication state
  isAuthenticated(): Promise<boolean> {
    return this.getCurrentUser().then(user => !!user);
  }

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
}