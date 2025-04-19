import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private firestore;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.firestore = getFirestore(app);
  }

  // Get all books
  async getBooks() {
    const booksCol = collection(this.firestore, 'books');
    const snapshot = await getDocs(booksCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Add a new book
  async addBook(book: any) {
    const booksCol = collection(this.firestore, 'books');
    return await addDoc(booksCol, book);
  }

  // Update a book
  async updateBook(bookId: string, data: any) {
    const bookRef = doc(this.firestore, 'books', bookId);
    return await updateDoc(bookRef, data);
  }

  // Delete a book
  async deleteBook(bookId: string) {
    const bookRef = doc(this.firestore, 'books', bookId);
    return await deleteDoc(bookRef);
  }

  // User Methods
  async getUsers(): Promise<User[]> {
    try {
      const usersCol = collection(this.firestore, 'users');
      const snapshot = await getDocs(usersCol);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)); // Ensure User type is used
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  async addUser(user: User): Promise<void> {
    try {
      const usersRef = collection(this.firestore, 'users');
      await addDoc(usersRef, { ...user, id: user.memberID }); // Ensure memberID is used as the document ID
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async getUser(memberID: string): Promise<User | null> {
    try {
      const userDoc = doc(this.firestore, 'users', memberID); // Use memberID as the document ID
      const docSnap = await getDoc(userDoc);
      return docSnap.exists() ? docSnap.data() as User : null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async updateUser(memberID: string, data: Partial<User>): Promise<void> {
    try {
      const userDoc = doc(this.firestore, 'users', memberID); // Use memberID as the document ID
      await updateDoc(userDoc, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Borrowing Methods
  async getBorrowings() {
    const borrowingsCol = collection(this.firestore, 'borrowings');
    const snapshot = await getDocs(borrowingsCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addBorrowing(borrowing: any) {
    const borrowingsCol = collection(this.firestore, 'borrowings');
    return await addDoc(borrowingsCol, borrowing);
  }

  async updateBorrowing(borrowingId: string, data: any) {
    const borrowingRef = doc(this.firestore, 'borrowings', borrowingId);
    return await updateDoc(borrowingRef, data);
  }

  async getUserBorrowings(userId: string) {
    const borrowingsCol = collection(this.firestore, 'borrowings');
    const q = query(borrowingsCol, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}