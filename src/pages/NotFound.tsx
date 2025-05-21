
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-library-background">
      <div className="text-center max-w-md px-4">
        <Book className="h-16 w-16 mx-auto mb-4 text-library-primary" />
        <h1 className="text-4xl font-bold mb-4 text-library-text">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="bg-library-primary hover:bg-library-primary/90">
            Return to Library
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
