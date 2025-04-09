
import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";
import AuthModals, { AuthModalType } from "@/components/auth/AuthModals";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/base-components";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<AuthModalType>(null);

  const openAuthModal = (type: AuthModalType) => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const switchAuthModal = (type: AuthModalType) => {
    setAuthModalType(type);
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-border">
        <nav className="container mx-auto py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.span 
              className="text-2xl font-bold gradient-text"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              VidyaPaalam
            </motion.span>
            <motion.span 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              (skill-bridge)
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/skills" className="text-foreground hover:text-primary transition-colors">
              Explore Skills
            </Link>
            <Link to="/teachers" className="text-foreground hover:text-primary transition-colors">
              Find Teachers
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Button variant="outline" className="mr-2" onClick={() => openAuthModal("signin")}>
              Sign In
            </Button>
            <Button onClick={() => openAuthModal("signup")}>
              Join Now
            </Button>
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
          <motion.div 
            className="md:hidden bg-background border-b"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 flex flex-col space-y-4">
              <Link 
                to="/skills" 
                className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Skills
              </Link>
              <Link 
                to="/teachers" 
                className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Teachers
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signin");
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signup");
                  }}
                >
                  Join Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Auth Modals */}
      <AuthModals
        isOpen={authModalOpen}
        modalType={authModalType}
        onClose={closeAuthModal}
        onSwitchModal={switchAuthModal}
      />
    </>
  );
};

export default Navbar;
