export interface Book {
  id?: string;
  title: string;
  author: string;
  category: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  available: boolean;
  coverUrl: string;
  rating: number;
}