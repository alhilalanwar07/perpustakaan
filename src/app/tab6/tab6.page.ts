import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
  standalone: false,
})
export class Tab6Page {
  memberDetails = {
    name: 'Ahmad Fadli',
    memberId: 'M001',
    joinDate: '2024-01-15',
    status: 'Active'
  };

  activityStats = [
    {
      icon: 'book-outline',
      value: '5',
      label: 'Dipinjam'
    },
    {
      icon: 'time-outline',
      value: '2',
      label: 'Terlambat'
    },
    {
      icon: 'checkmark-circle-outline',
      value: '15',
      label: 'Selesai'
    }
  ];

  recentActivities = [
    {
      type: 'borrow',
      bookTitle: 'Pemrograman Java',
      date: '2024-02-15',
      status: 'active'
    },
    {
      type: 'return',
      bookTitle: 'Database MySQL',
      date: '2024-02-10',
      status: 'completed'
    },
    {
      type: 'overdue',
      bookTitle: 'Python Basics',
      date: '2024-02-01',
      status: 'late'
    }
  ];

  constructor() { }
}