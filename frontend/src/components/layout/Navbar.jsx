import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartSidebar from '@/components/layout/CartSidebar';

const navLinks = [
  { href: '/products/new-arrivals', label: 'New Arrivals' },
  { href: '/products/women', label: 'Women' },
  { href: '/products/men', label: 'Men' },
  { href: '/products/accessories', label: 'Accessories' },
];

const Navbar = () => {
  const location = useLocation();
  const { itemCount, isCartOpen, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-btn">
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/"
                  className="font-serif text-2xl font-bold text-primary mb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HFashion
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'text-lg py-2 transition-colors',
                      isActive(link.href) ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4">
                  <Link
                    to="/account"
                    className="flex items-center gap-2 text-lg py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" strokeWidth={1.5} />
                    My Account
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="font-serif text-xl md:text-2xl font-bold text-primary" data-testid="logo">
            HFashion
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'nav-link text-sm font-medium transition-colors',
                  isActive(link.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                )}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex" data-testid="search-btn">
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </Button>
            
            <Link to="/account">
              <Button variant="ghost" size="icon" data-testid="account-btn">
                <User className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
              data-testid="cart-btn"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
};

export default Navbar;
