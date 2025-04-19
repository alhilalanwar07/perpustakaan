import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DatePipe
  ]
})
export class Tab1Page {
  searchTerm: string = '';
  selectedFilter: string = 'active';
  books: any[] = [
    {
      id: 1,
      title: 'Pemrograman Java',
      author: 'John Doe',
      borrowDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      status: 'active',
      icon: 'book-outline',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Database MySQL',
      author: 'Jane Smith',
      borrowDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 6)),
      status: 'pending',
      icon: 'book-outline',
      color: 'warning'
    },
    {
      id: 3,
      title: 'Python for Beginners',
      author: 'Bob Wilson',
      borrowDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      dueDate: new Date(new Date().setDate(new Date().getDate())),
      status: 'history',
      icon: 'book-outline',
      color: 'success'
    }
  ];

  constructor(private router: Router) {}

  get filteredBooks() {
    return this.books.filter(book => {
      const matchesSearch = !this.searchTerm || 
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesFilter = this.selectedFilter === book.status;
      
      return matchesSearch && matchesFilter;
    });
  }

  filterChanged(event: any) {
    this.selectedFilter = event.detail.value;
  }

  searchBooks() {
    // The filtering is handled by the getter
  }

  addNewBorrowing() {
    console.log('Navigate to add new borrowing page');
    // this.router.navigate(['/add-borrowing']);
  }
}
