
import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/common/Navbar";
import BookForm from "@/components/books/BookForm";

const ManageBooks = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("id") || undefined;

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
        
        <BookForm bookId={bookId} />
      </div>
    </div>
  );
};

export default ManageBooks;
