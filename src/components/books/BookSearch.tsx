
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLibrary } from "@/context/LibraryContext";
import { Book } from "@/types";
import { Search } from "lucide-react";

interface BookSearchProps {
  onSearchResults: (books: Book[]) => void;
}

const BookSearch = ({ onSearchResults }: BookSearchProps) => {
  const { searchBooks, books } = useLibrary();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<string>("");
  const [genre, setGenre] = useState("");

  // Extract unique genres for the dropdown
  const genres = Array.from(new Set(books.map(book => book.genre)));
  // Extract unique years for the dropdown
  const years = Array.from(new Set(books.map(book => book.year))).sort((a, b) => b - a);

  const handleSearch = () => {
    const query: {
      title?: string;
      author?: string;
      year?: number;
      genre?: string;
    } = {};

    if (title) query.title = title;
    if (author) query.author = author;
    if (year) query.year = parseInt(year);
    if (genre) query.genre = genre;

    const results = searchBooks(query);
    onSearchResults(results);
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
    onSearchResults(books);
  };

  // Initial search on component mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-library-text flex items-center">
        <Search className="mr-2 h-5 w-5 text-library-primary" />
        Search Books
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Search by title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            placeholder="Search by author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any year</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger id="genre">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any genre</SelectItem>
              {genres.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSearch} className="bg-library-primary hover:bg-library-primary/90">
          Search
        </Button>
      </div>
    </div>
  );
};

export default BookSearch;
