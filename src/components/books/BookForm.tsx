
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "@/context/LibraryContext";
import { Book } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BookFormProps {
  bookId?: string;
}

const BookForm = ({ bookId }: BookFormProps) => {
  const { books, addBook, editBook } = useLibrary();
  const navigate = useNavigate();
  
  const existingBook = bookId ? books.find((b) => b.id === bookId) : null;
  const isEditing = !!existingBook;

  const [title, setTitle] = useState(existingBook?.title || "");
  const [author, setAuthor] = useState(existingBook?.author || "");
  const [year, setYear] = useState(existingBook?.year.toString() || "");
  const [genre, setGenre] = useState(existingBook?.genre || "");
  const [status, setStatus] = useState<"borrowed" | "returned">(existingBook?.status || "returned");

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
    
    const bookData = {
      title,
      author,
      year: parseInt(year),
      genre,
      status,
    };

    if (isEditing && bookId) {
      editBook(bookId, bookData);
    } else {
      addBook(bookData);
    }
    
    navigate("/");
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
                  <SelectItem value="returned">Returned</SelectItem>
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
