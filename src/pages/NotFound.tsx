import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-black text-primary">404</h1>
        <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Home Page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
