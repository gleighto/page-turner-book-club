
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "@/context/LibraryContext";
import { Book } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface BookFormProps {
  bookId?: string;
  currentBook: Book | null;
}

const BookForm = ({ bookId, currentBook }: BookFormProps) => {
  const { addBook, editBook } = useLibrary();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!bookId && !!currentBook;
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<"borrowed" | "returned">("returned");

  // Set form values when currentBook changes (for editing)
  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title || "");
      setAuthor(currentBook.author || "");
      setYear(currentBook.year?.toString() || "");
      setGenre(currentBook.genre || "");
      setStatus(currentBook.status || "returned");
    } else {
      // Reset form when adding a new book
      setTitle("");
      setAuthor("");
      setYear("");
      setGenre("");
      setStatus("returned");
    }
  }, [currentBook]);

  // Common genres for suggestions
  const commonGenres = [
    "Fiction", 
    "Non-fiction", 
    "Mystery", 
    "Science Fiction", 
    "Fantasy", 
    "Romance", 
    "Thriller", 
    "Horror", 
    "Biography", 
    "History",
    "Dystopian",
    "Young Adult",
    "Children's",
    "Poetry",
    "Drama"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !author || !year || !genre) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const bookData = {
      title,
      author,
      year: parseInt(year),
      genre,
      status,
    };

    try {
      if (isEditing && bookId) {
        editBook(bookId, bookData);
        toast({
          title: "Book Updated",
          description: `"${title}" has been updated successfully`,
        });
      } else {
        addBook(bookData);
        toast({
          title: "Book Added",
          description: `"${title}" has been added to the library`,
        });
      }
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the book",
        variant: "destructive",
      });
      console.error("Error saving book:", error);
    }
  };

  // Generate year options from 1900 to current year
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1899 },
    (_, i) => (currentYear - i).toString()
  );

  return (
    <Card className="w-full shadow">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEditing ? "Edit Book" : "Add New Book"}
        </CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="year">Publication Year</Label>
              <Select value={year} onValueChange={setYear} required>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select value={genre} onValueChange={setGenre} required>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {commonGenres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={status} 
                onValueChange={(val: "borrowed" | "returned") => setStatus(val)}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="returned">Available</SelectItem>
                  <SelectItem value="borrowed">Borrowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-library-primary hover:bg-library-primary/90">
            {isEditing ? "Update" : "Add"} Book
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookForm;
