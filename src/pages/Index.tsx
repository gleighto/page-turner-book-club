import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLibrary } from "@/context/LibraryContext";
import Navbar from "@/components/common/Navbar";
import BookSearch from "@/components/books/BookSearch";
import BookList from "@/components/books/BookList";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";
import { Book as BookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { books } = useLibrary();
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearchResults = (results: Book[]) => {
    setSearchResults(results);
  };

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen bg-library-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-library-text">My Library</h1>
          <Link to="/manage">
            <Button className="bg-library-primary hover:bg-library-primary/90">
              <BookIcon className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </Link>
        </div>
        
        <div className="space-y-6">
          <BookSearch onSearchResults={handleSearchResults} />
          
          <div className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-library-text">
                Book Collection {searchResults.length > 0 && `(${searchResults.length})`}
              </h2>
            </div>
            <BookList books={searchResults} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
