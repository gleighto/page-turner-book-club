
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book, BorrowRecord } from "../types";
import { mockBooks, mockBorrowRecords } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface LibraryContextProps {
  books: Book[];
  borrowRecords: BorrowRecord[];
  addBook: (book: Omit<Book, "id">) => void;
  editBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  searchBooks: (query: {
    title?: string;
    author?: string;
    year?: number;
    genre?: string;
  }) => Book[];
  updateBookStatus: (bookId: string, status: "borrowed" | "returned") => void;
}

const LibraryContext = createContext<LibraryContextProps | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider = ({ children }: LibraryProviderProps) => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(
    mockBorrowRecords
  );
  const { toast } = useToast();

  const addBook = (book: Omit<Book, "id">) => {
    const newBook: Book = {
      ...book,
      id: `b${books.length + 1}`,
    };
    
    setBooks([...books, newBook]);
    
    toast({
      title: "Book added",
      description: `"${book.title}" has been added to the library`,
    });
  };

  const editBook = (id: string, bookUpdate: Partial<Book>) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, ...bookUpdate } : book
      )
    );
    
    toast({
      title: "Book updated",
      description: "The book information has been updated",
    });
  };

  const deleteBook = (id: string) => {
    const bookToDelete = books.find(book => book.id === id);
    
    setBooks(books.filter((book) => book.id !== id));
    
    // Also remove any borrow records for this book
    setBorrowRecords(
      borrowRecords.filter((record) => record.bookId !== id)
    );
    
    toast({
      title: "Book deleted",
      description: bookToDelete ? `"${bookToDelete.title}" has been removed from the library` : "Book has been removed",
      variant: "destructive",
    });
  };

  const searchBooks = (query: {
    title?: string;
    author?: string;
    year?: number;
    genre?: string;
  }): Book[] => {
    return books.filter((book) => {
      let matches = true;
      
      if (query.title && !book.title.toLowerCase().includes(query.title.toLowerCase())) {
        matches = false;
      }
      
      if (query.author && !book.author.toLowerCase().includes(query.author.toLowerCase())) {
        matches = false;
      }
      
      if (query.year && book.year !== query.year) {
        matches = false;
      }
      
      if (query.genre && !book.genre.toLowerCase().includes(query.genre.toLowerCase())) {
        matches = false;
      }
      
      return matches;
    });
  };

  const updateBookStatus = (bookId: string, status: "borrowed" | "returned") => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, status } : book
      )
    );
    
    const bookTitle = books.find(b => b.id === bookId)?.title || "Book";
    
    toast({
      title: `Book ${status}`,
      description: `"${bookTitle}" has been ${status}`,
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        borrowRecords,
        addBook,
        editBook,
        deleteBook,
        searchBooks,
        updateBookStatus,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
