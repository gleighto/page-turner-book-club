
import { Book } from "@/types";
import BookCard from "./BookCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface BookListProps {
  books: Book[];
  onBookStatusChange?: () => void;
}

const BookList = ({ books, onBookStatusChange }: BookListProps) => {
  const isMobile = useIsMobile();

  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No books found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onStatusChange={onBookStatusChange}
        />
      ))}
    </div>
  );
};

export default BookList;
