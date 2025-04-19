import { Component, OnInit } from '@angular/core'; // Import OnInit

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false
})
// Implement OnInit
export class Tab2Page implements OnInit {
  filter = 'today';
  transactions = [
    {
      id: 1,
      type: 'income',
      description: 'Gaji Bulanan',
      amount: 5000000,
      category: 'Pendapatan',
      date: new Date(),
      icon: 'cash-outline'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Belanja',
      amount: 750000,
      category: 'Belanja',
      date: new Date(),
      icon: 'cart-outline'
    },
    {
      id: 3,
      type: 'expense',
      description: 'Makan Siang',
      amount: 50000,
      category: 'Makanan & Minuman',
      date: new Date(),
      icon: 'restaurant-outline'
    }
  ];

  // Add constructor for logging
  constructor() {
    console.log('Tab2Page constructor called');
  }

  // Add ngOnInit for logging
  ngOnInit() {
    console.log('Tab2Page ngOnInit called');
  }

  get filteredTransactions() {
    console.log('Tab2Page filteredTransactions getter called');
    try {
      // --- Original Logic Start ---
      const now = new Date();
      let filtered = this.transactions.slice();

      if (this.filter === 'today') {
        filtered = filtered.filter(t =>
          t.date.toDateString() === now.toDateString()
        );
      } else if (this.filter === 'week') {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        filtered = filtered.filter(t =>
          t.date >= weekStart && t.date <= weekEnd
        );
      }

      return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
      // --- Original Logic End ---

      // --- Simplified Return (for debugging) ---
      // return []; // Return empty array to test if getter logic is the issue
      // return this.transactions; // Return raw data
    } catch (error) {
      console.error('Error in filteredTransactions:', error);
      return []; // Return empty array on error
    }
  }

  get groupedTransactions() {
    console.log('Tab2Page groupedTransactions getter called');
     try {
      // --- Original Logic Start ---
      const groups: { [key: string]: any[] } = {};
      const now = new Date();
      const today = now.toDateString();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      this.filteredTransactions.forEach(t => { // This depends on filteredTransactions
        const date = t.date.toDateString();
        let label;

        if (date === today) {
          label = 'Hari Ini';
        } else if (date === yesterdayStr) {
          label = 'Kemarin';
        } else {
          label = t.date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }

        if (!groups[label]) {
          groups[label] = [];
        }
        groups[label].push(t);
      });

      return Object.entries(groups).map(([dateLabel, transactions]) => ({
        dateLabel,
        transactions
      }));
      // --- Original Logic End ---

      // --- Simplified Return (for debugging) ---
      // return []; // Return empty array to test if getter logic is the issue
    } catch (error) {
      console.error('Error in groupedTransactions:', error);
      return []; // Return empty array on error
    }
  }

  addTransaction() {
    // TODO: Implement modal for adding transaction
    console.log('Tambah transaksi');
  }
}
