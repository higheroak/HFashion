import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { searchProducts } from '@/data/store';
import { trackPageView, trackSearch } from '@/lib/tracking';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    trackPageView('search');
    
    if (query.length >= 2) {
      const data = searchProducts(query, 50);
      setProducts(data);
      trackSearch(query);
    } else {
      setProducts([]);
    }
  }, [query]);

  // Trigger Medallia SPA update after embedded container is mounted
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (window.KAMPYLE_ONSITE_SDK && typeof window.KAMPYLE_ONSITE_SDK.updatePageView === 'function') {
        window.KAMPYLE_ONSITE_SDK.updatePageView();
        console.log('[Medallia SPA] Search results page loaded with embedded container');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [query, products.length]);

  return (
    <>
      <div className="min-h-screen py-6 md:py-8 lg:py-12" data-testid="search-results-page">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-4 md:mb-6">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-foreground font-medium">Search Results</span>
        </nav>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-2" data-testid="search-title">
            Search Results
          </h1>
          {query && (
            <p className="text-muted-foreground text-sm md:text-base">
              {products.length} result{products.length !== 1 ? 's' : ''} for "{query}"
            </p>
          )}
        </div>

        {/* Results */}
        {!query || query.length < 2 ? (
          <div className="empty-state py-16 md:py-24">
            <Search className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground/20 mx-auto mb-6" strokeWidth={1} />
            <p className="text-lg font-medium mb-2">Enter a search term</p>
            <p className="text-sm text-muted-foreground mb-6">
              Type at least 2 characters to search for products
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state py-16 md:py-24">
            <Search className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground/20 mx-auto mb-6" strokeWidth={1} />
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="text-sm text-muted-foreground mb-6">
              We couldn't find any products matching "{query}"
            </p>
            <Link to="/products/new-arrivals">
              <Button className="btn-primary">Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="products-grid" data-testid="search-products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
