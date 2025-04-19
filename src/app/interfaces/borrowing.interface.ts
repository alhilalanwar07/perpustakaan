export interface Borrowing {
  id?: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  returnDate?: string;
  status: 'active' | 'overdue' | 'completed';
}