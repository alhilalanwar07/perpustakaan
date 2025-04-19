import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab3Page implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = 'all';
  books: any[] = [];
  
  // Add categories property
  categories = [
    { id: 'all', name: 'Semua' },
    { id: 'Programming', name: 'Pemrograman' },
    { id: 'Database', name: 'Database' },
    { id: 'Network', name: 'Jaringan' }
  ];

  constructor(private dbService: DatabaseService) {}

  async ngOnInit() {
    await this.loadBooks();
  }

  async loadBooks() {
    try {
      this.books = await this.dbService.getBooks();
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }

  async addNewBook(bookData: any) {
    try {
      await this.dbService.addBook(bookData);
      await this.loadBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  // Add getAvailabilityPercent method
  getAvailabilityPercent(book: any): number {
    return Math.round((book.availableCopies / book.totalCopies) * 100);
  }

  filterBooks() {
    return this.books.filter(book => {
      const matchesSearch = !this.searchTerm || 
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || 
        book.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }
}
