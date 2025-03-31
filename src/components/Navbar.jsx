import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Properties", path: "/properties" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceItems = [
    { name: "All Services", path: "/services" },
    { name: "Landlord Services", path: "/services/landlord" },
    { name: "Tenant Services", path: "/services/tenant" },
    { name: "Investor Services", path: "/services/investor" },
  ];

  return (
    <nav className="bg-background border-b relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              PropertyManager
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium transition-colors hover:text-primary py-2"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-1 outline-none">
                Services <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {serviceItems.map((item) => (
                  <DropdownMenuItem key={item.name} className="cursor-pointer">
                    <Link
                      to={item.path}
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Services Menu */}
              <div className="px-3 py-2">
                <div className="font-medium mb-2">Services</div>
                {serviceItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="px-3 py-2">
                {user ? (
                  <Button className="w-full" variant="outline" onClick={signOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant="default"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
