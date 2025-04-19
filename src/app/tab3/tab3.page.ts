import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  searchTerm: string = '';
  selectedCategory: string = 'all';
  
  books = [
    {
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'Programming',
      icon: 'code-slash-outline',
      color: 'primary',
      available: true,
      coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      totalCopies: 3,
      availableCopies: 2,
      description: 'A Handbook of Agile Software Craftsmanship',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Design Patterns',
      author: 'Erich Gamma et al.',
      category: 'Programming',
      icon: 'construct-outline',
      color: 'success',
      available: true,
      coverUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2',
      totalCopies: 2,
      availableCopies: 0,
      description: 'Elements of Reusable Object-Oriented Software',
      rating: 4.7
    },
    {
      id: 3,
      title: 'Database Systems',
      author: 'Thomas Connolly',
      category: 'Database',
      icon: 'server-outline',
      color: 'warning',
      available: false,
      coverUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
      totalCopies: 4,
      availableCopies: 1,
      description: 'A Practical Approach to Design, Implementation, and Management',
      rating: 4.5
    }
  ];

  categories = [
    { id: 'all', name: 'Semua' },
    { id: 'Programming', name: 'Pemrograman' },
    { id: 'Database', name: 'Database' },
    { id: 'Network', name: 'Jaringan' }
  ];

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
