import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchProducts } from '@/data/store';
import { trackSearch } from '@/lib/tracking';
import { formatPrice, getCategoryLabel } from '@/lib/utils';

const SearchBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const data = searchProducts(query);
          setResults(data);
          setShowResults(true);
          trackSearch(query);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setShowResults(false);
    }
  }, [isOpen]);

  // Handle escape key and click outside (desktop only)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      // Only close on click outside for desktop
      if (window.innerWidth >= 768 && containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Only lock scroll on mobile
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleProductClick = useCallback((productId) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setResults([]);
    setShowResults(false);
    onClose();
  }, [navigate, onClose]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
      onClose();
    }
  }, [query, navigate, onClose]);

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Mobile: Full screen overlay */}
      <div className="md:hidden fixed inset-0 z-[100]" data-testid="search-overlay-mobile">
        {/* Frosted glass background */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-lg" />
        
        {/* Content */}
        <div className="relative h-full overflow-y-auto">
          <div className="px-4 py-6">
            {/* Close button for mobile */}
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 rounded-full"
                data-testid="search-close-mobile"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </div>
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 pl-12 pr-16 text-base rounded-full border-2 focus:border-primary bg-card"
                  data-testid="search-input"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {query && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClear}
                      className="h-8 w-8 rounded-full"
                      data-testid="search-clear"
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                  )}
                </div>
              </div>
            </form>

            {/* Search Results */}
            {showResults && (
              <div className="mt-4 bg-card rounded-xl border shadow-lg overflow-hidden" data-testid="search-results">
                {results.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No products found for "{query}"</p>
                    <p className="text-sm text-muted-foreground mt-2">Try different keywords</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 border-b bg-secondary/30">
                      <p className="text-sm text-muted-foreground">
                        {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                      </p>
                    </div>
                    <div className="max-h-[50vh] overflow-y-auto">
                      {results.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors text-left"
                          data-testid={`search-result-${product.id}`}
                        >
                          <div className="w-14 h-18 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              {getCategoryLabel(product.category)}
                            </p>
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-medium text-sm">{formatPrice(product.price)}</span>
                              {product.original_price && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(product.original_price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t bg-secondary/30">
                      <Button onClick={handleSearchSubmit} variant="outline" className="w-full rounded-full text-sm">
                        View all results
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Popular Searches */}
            {!showResults && query.length < 2 && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Dress', 'Sweater', 'Accessories', 'Linen', 'Leather'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-2 bg-card border rounded-full text-sm hover:bg-secondary/50 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop: Centered dropdown panel */}
      <div className="hidden md:block fixed inset-0 z-[100]" data-testid="search-overlay-desktop">
        {/* Semi-transparent backdrop */}
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        
        {/* Centered container */}
        <div className="flex justify-center pt-20">
          <div 
            ref={containerRef}
            className="w-full max-w-xl mx-4 bg-background rounded-2xl shadow-2xl border overflow-hidden"
            style={{ maxHeight: '70vh' }}
          >
            {/* Search Input */}
            <div className="p-4 border-b bg-background">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-12 pl-12 pr-20 text-base rounded-full border-2 focus:border-primary bg-card"
                    data-testid="search-input-desktop"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                    {query && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleClear}
                        className="h-8 w-8 rounded-full"
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="h-8 w-8 rounded-full"
                      data-testid="search-close-desktop"
                    >
                      <X className="h-5 w-5" strokeWidth={1.5} />
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* Content area */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 80px)' }}>
              {/* Search Results */}
              {showResults ? (
                results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No products found for "{query}"</p>
                    <p className="text-sm text-muted-foreground mt-2">Try different keywords or browse categories</p>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-3 border-b bg-secondary/30">
                      <p className="text-sm text-muted-foreground">
                        {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                      </p>
                    </div>
                    <div>
                      {results.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors text-left border-b last:border-b-0 cursor-pointer relative z-10"
                          data-testid={`search-result-${product.id}`}
                        >
                          <div className="w-16 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              {getCategoryLabel(product.category)}
                            </p>
                            <p className="font-medium text-base truncate">{product.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-medium">{formatPrice(product.price)}</span>
                              {product.original_price && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(product.original_price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-4 border-t bg-secondary/30">
                      <Button onClick={handleSearchSubmit} variant="outline" className="w-full rounded-full">
                        View all results for "{query}"
                      </Button>
                    </div>
                  </>
                )
              ) : (
                /* Popular Searches - Default state */
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Dress', 'Sweater', 'Accessories', 'Linen', 'Leather', 'Jacket', 'Suit'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-secondary/50 border rounded-full text-sm hover:bg-secondary transition-colors"
                        data-testid={`popular-search-${term.toLowerCase()}`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default SearchBar;
