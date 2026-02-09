import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';
import { trackPageView, trackFilter } from '@/lib/tracking';
import { getCategoryLabel } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

const priceRanges = [
  { value: '0-50', label: 'Under $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200+', label: '$200+' },
];

const ProductListPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [priceFilter, setPriceFilter] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    trackPageView('products', category);
    
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const params = category && category !== 'all' ? { category } : {};
        const data = await getProducts(params);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Apply price filter
    if (priceFilter.length > 0) {
      filtered = filtered.filter((product) => {
        return priceFilter.some((range) => {
          const price = product.price;
          if (range === '0-50') return price < 50;
          if (range === '50-100') return price >= 50 && price < 100;
          if (range === '100-200') return price >= 100 && price < 200;
          if (range === '200+') return price >= 200;
          return true;
        });
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setFilteredProducts(filtered);
  }, [products, sortBy, priceFilter]);

  const handleSortChange = (value) => {
    setSortBy(value);
    trackFilter('sort', value);
  };

  const handlePriceFilterChange = (range) => {
    const newFilter = priceFilter.includes(range)
      ? priceFilter.filter((r) => r !== range)
      : [...priceFilter, range];
    setPriceFilter(newFilter);
    trackFilter('price', newFilter.join(','));
  };

  const clearFilters = () => {
    setPriceFilter([]);
    setSortBy('newest');
  };

  const pageTitle = category ? getCategoryLabel(category) : 'All Products';

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6" data-testid="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-foreground font-medium">{pageTitle}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold" data-testid="page-title">
              {pageTitle}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" className="rounded-full gap-2" data-testid="mobile-filter-btn">
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
                  Filters
                  {priceFilter.length > 0 && (
                    <span className="ml-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                      {priceFilter.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="font-serif">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <div className="filter-section">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.value} className="filter-option">
                          <Checkbox
                            checked={priceFilter.includes(range.value)}
                            onCheckedChange={() => handlePriceFilterChange(range.value)}
                            data-testid={`mobile-price-filter-${range.value}`}
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {priceFilter.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full mt-4"
                      onClick={clearFilters}
                      data-testid="mobile-clear-filters"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] rounded-full" data-testid="sort-select">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} data-testid={`sort-${option.value}`}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium">Filters</h3>
                {priceFilter.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    data-testid="clear-filters"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="filter-section">
                <h4 className="font-medium text-sm mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.value} className="filter-option">
                      <Checkbox
                        checked={priceFilter.includes(range.value)}
                        onCheckedChange={() => handlePriceFilterChange(range.value)}
                        data-testid={`price-filter-${range.value}`}
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {priceFilter.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {priceFilter.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handlePriceFilterChange(filter)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                    data-testid={`active-filter-${filter}`}
                  >
                    {priceRanges.find((r) => r.value === filter)?.label}
                    <X className="h-3 w-3" strokeWidth={1.5} />
                  </button>
                ))}
              </div>
            )}

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
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state py-24">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters or browse all products
                </p>
                <Button onClick={clearFilters} variant="outline" className="rounded-full">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="products-grid" data-testid="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
