
import { Book, User, BorrowRecord } from "../types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane@example.com",
  },
];

// Mock books
export const mockBooks: Book[] = [
  {
    id: "b1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction",
    status: "returned",
  },
  {
    id: "b2",
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    status: "borrowed",
  },
  {
    id: "b3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction",
    status: "returned",
  },
  {
    id: "b4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    status: "borrowed",
  },
  {
    id: "b5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Fiction",
    status: "returned",
  },
  {
    id: "b6",
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    genre: "Dystopian",
    status: "returned",
  },
];

// Mock borrow records
export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: "br1",
    bookId: "b2",
    userId: "u1",
    borrowDate: "2023-04-15",
    returnDate: null,
  },
  {
    id: "br2",
    bookId: "b4",
    userId: "u2",
    borrowDate: "2023-05-10",
    returnDate: null,
  },
  {
    id: "br3",
    bookId: "b1",
    userId: "u1",
    borrowDate: "2023-03-20",
    returnDate: "2023-04-05",
  },
];
