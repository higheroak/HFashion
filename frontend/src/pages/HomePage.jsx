import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, RefreshCw, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import { getProducts, seedDatabase } from '../lib/api';
import { trackPageView } from '../lib/tracking';

const categoryImages = {
  women: 'https://images.unsplash.com/photo-1509087859087-a384654eca4d?w=600&h=800&fit=crop',
  men: 'https://images.unsplash.com/photo-1744135995007-f1dde493d241?w=600&h=800&fit=crop',
  accessories: 'https://images.unsplash.com/photo-1565374369705-acde12f3caa2?w=600&h=800&fit=crop',
};

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Absolutely love the quality and style. HFashion has become my go-to for timeless pieces.',
    rating: 5,
  },
  {
    name: 'James L.',
    text: 'The attention to detail is impressive. Fast shipping and excellent customer service.',
    rating: 5,
  },
  {
    name: 'Emma K.',
    text: 'Beautiful earth-tone collection. Every piece feels thoughtfully designed.',
    rating: 5,
  },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackPageView('home');
    
    const loadProducts = async () => {
      try {
        // Seed database first
        await seedDatabase();
        
        const [featured, trending] = await Promise.all([
          getProducts({ featured: true }),
          getProducts({ trending: true }),
        ]);
        
        setFeaturedProducts(featured.slice(0, 4));
        setTrendingProducts(trending.slice(0, 4));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="animate-slide-up">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4">
                New Season Collection
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Timeless Style,<br />
                <span className="text-primary">Modern Elegance</span>
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground mb-8 max-w-md">
                Discover our curated collection of contemporary fashion pieces designed for 
                the modern individual who values quality and sustainability.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products/new-arrivals">
                  <Button className="btn-primary" data-testid="shop-new-arrivals-btn">
                    Shop New Arrivals
                  </Button>
                </Link>
                <Link to="/products/women">
                  <Button variant="outline" className="btn-secondary" data-testid="explore-collection-btn">
                    Explore Collection
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Images - Tetris Grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden h-64 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <img
                      src="https://images.unsplash.com/photo-1746948268925-11aaaa72f05d?w=400&h=500&fit=crop"
                      alt="Fashion model"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-48 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <img
                      src="https://images.unsplash.com/photo-1713199472895-6ae87bc45bb8?w=400&h=300&fit=crop"
                      alt="Fashion accessories"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden h-80 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <img
                      src="https://images.unsplash.com/photo-1509087859087-a384654eca4d?w=400&h=600&fit=crop"
                      alt="Fashion collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y bg-secondary/30 py-6">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Truck className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <span className="text-sm">Free shipping over $100</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <RefreshCw className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <span className="text-sm">30-day free returns</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <Shield className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <span className="text-sm">Secure checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24" data-testid="featured-section">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Curated Selection</span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-2">Featured Pieces</h2>
            </div>
            <Link to="/products/new-arrivals" className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="products-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="skeleton aspect-[3/4] rounded-lg" />
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-4 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="products-grid stagger-children">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/products/new-arrivals">
              <Button variant="outline" className="rounded-full">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-secondary/20" data-testid="categories-section">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shop by</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-2">Categories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Women's", slug: 'women', image: categoryImages.women },
              { name: "Men's", slug: 'men', image: categoryImages.men },
              { name: 'Accessories', slug: 'accessories', image: categoryImages.accessories },
            ].map((category) => (
              <Link
                key={category.slug}
                to={`/products/${category.slug}`}
                className="category-card group relative h-80 md:h-96 rounded-xl overflow-hidden"
                data-testid={`category-${category.slug}`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-[2]">
                  <h3 className="font-serif text-xl md:text-2xl text-white font-semibold mb-2">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-white/80 text-sm group-hover:text-white transition-colors">
                    Shop Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 md:py-24" data-testid="trending-section">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What's Hot</span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-2">Trending Now</h2>
            </div>
            <Link to="/products/new-arrivals" className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="products-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="skeleton aspect-[3/4] rounded-lg" />
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-4 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="products-grid stagger-children">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-secondary/20" data-testid="testimonials-section">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What Our Customers Say</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-2">Customer Reviews</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" data-testid={`testimonial-${index}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-medium text-sm">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medallia Feedback Placeholder */}
      <section className="py-8 bg-primary/5 text-center" data-testid="medallia-feedback-section">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">
            {/* Medallia Digital Feedback widget will appear here */}
            We value your feedback. Help us improve your shopping experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
