
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-border">
      <nav className="container mx-auto py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold gradient-text">VidyaPaalam</span>
          <span className="text-sm text-muted-foreground">(skill-bridge)</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/skills" className="text-foreground hover:text-primary transition-colors">
            Explore Skills
          </Link>
          <Link to="/mentors" className="text-foreground hover:text-primary transition-colors">
            Find Mentors
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/signin">
            <Button variant="outline" className="mr-2">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Join Now</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/skills" 
              className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Skills
            </Link>
            <Link 
              to="/mentors" 
              className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Mentors
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
