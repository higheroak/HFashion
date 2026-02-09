import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { searchProducts } from '@/lib/api';
import { trackPageView, trackSearch } from '@/lib/tracking';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackPageView('search');
    
    const loadResults = async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const data = await searchProducts(query, 50);
          setProducts(data);
          trackSearch(query);
        } catch (error) {
          console.error('Search error:', error);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setProducts([]);
        setIsLoading(false);
      }
    };

    loadResults();
  }, [query]);

  return (
    <div className="min-h-screen py-8 md:py-12" data-testid="search-results-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-foreground font-medium">Search Results</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2" data-testid="search-title">
            Search Results
          </h1>
          {query && (
            <p className="text-muted-foreground">
              {isLoading ? 'Searching...' : `${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`}
            </p>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="products-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="skeleton aspect-[3/4] rounded-lg" />
                <div className="skeleton h-3 w-16" />
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-20" />
              </div>
            ))}
          </div>
        ) : !query || query.length < 2 ? (
          <div className="empty-state py-24">
            <Search className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" strokeWidth={1} />
            <p className="text-lg font-medium mb-2">Enter a search term</p>
            <p className="text-sm text-muted-foreground mb-6">
              Type at least 2 characters to search for products
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state py-24">
            <Search className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" strokeWidth={1} />
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
