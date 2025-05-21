
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLibrary } from "@/context/LibraryContext";
import { Edit, Trash } from "lucide-react";

interface BookCardProps {
  book: Book;
  showActions?: boolean;
  onStatusChange?: () => void;
}

const BookCard = ({ book, showActions = true, onStatusChange }: BookCardProps) => {
  const { deleteBook, updateBookStatus } = useLibrary();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    setTimeout(() => {
      deleteBook(book.id);
      setIsDeleting(false);
    }, 500);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/manage?id=${book.id}`);
  };

  const handleStatusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = book.status === "borrowed" ? "returned" : "borrowed";
    updateBookStatus(book.id, newStatus);
    
    // Call the onStatusChange callback if provided
    if (onStatusChange) {
      onStatusChange();
    }
  };

  // Determine the button label based on current status
  const statusButtonLabel = book.status === "borrowed" ? "Return" : "Borrow";

  // Display "Available" if status is "returned"
  const displayStatus = book.status === "returned" ? "available" : book.status;

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-2">{book.title}</CardTitle>
          <Badge 
            variant={book.status === "borrowed" ? "destructive" : "outline"}
            className={`
              ${book.status === "borrowed" ? "bg-library-borrowed" : "bg-library-returned text-white border-library-returned"}
            `}
          >
            {displayStatus}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Author:</span> {book.author}</p>
          <p><span className="font-medium">Year:</span> {book.year}</p>
          <p><span className="font-medium">Genre:</span> {book.genre}</p>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-2 border-t flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleStatusToggle}
          >
            {statusButtonLabel}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookCard;
