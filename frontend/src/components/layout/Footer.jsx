import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold text-primary">
              HFashion
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Discover curated collections of contemporary clothing and accessories. 
              Timeless style meets modern elegance.
            </p>
            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" data-testid="social-instagram">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" data-testid="social-facebook">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" data-testid="social-twitter">
                <Twitter className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products/new-arrivals" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products/women" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/products/men" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products/accessories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/account/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Returns
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (window.KAMPYLE_ONSITE_SDK && typeof window.KAMPYLE_ONSITE_SDK.showForm === 'function') {
                      window.KAMPYLE_ONSITE_SDK.showForm(35568);
                    } else {
                      console.warn('[Medallia] SDK not loaded yet');
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Provide Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and style updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
                data-testid="newsletter-email"
              />
              <button className="newsletter-btn" data-testid="newsletter-submit">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 HFashion. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
