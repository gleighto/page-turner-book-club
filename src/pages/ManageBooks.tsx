
import { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLibrary } from "@/context/LibraryContext";
import Navbar from "@/components/common/Navbar";
import BookForm from "@/components/books/BookForm";
import { Book } from "@/types";

const ManageBooks = () => {
  const { isAuthenticated } = useAuth();
  const { books } = useLibrary();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("id") || undefined;
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  
  // Fetch book data when editing
  useEffect(() => {
    if (bookId) {
      const bookToEdit = books.find(book => book.id === bookId);
      if (bookToEdit) {
        setCurrentBook(bookToEdit);
      } else {
        // If book not found, redirect to add new book page
        navigate('/manage');
      }
    } else {
      // Reset when adding a new book
      setCurrentBook(null);
    }
  }, [bookId, books, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen bg-library-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-library-text mb-6">
          {bookId ? "Edit Book" : "Add New Book"}
        </h1>
        
        <BookForm bookId={bookId} currentBook={currentBook} />
      </div>
    </div>
  );
};

export default ManageBooks;
