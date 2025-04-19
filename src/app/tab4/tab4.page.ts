import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class Tab4Page {
  notificationsEnabled = true;
  selectedLanguage = 'id';

  constructor(private router: Router) {}

  editProfile() {
    // Navigate to profile edit page
    console.log('Navigate to profile edit');
  }

  changePassword() {
    // Navigate to change password page
    console.log('Navigate to change password');
  }

  showAbout() {
    // Show about modal
    console.log('Show about modal');
  }

  async logout() {
    // Implement logout logic
    console.log('Logging out...');
    await this.router.navigate(['/login']);
  }
}
