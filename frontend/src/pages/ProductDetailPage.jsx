import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Minus, Plus, Heart, Truck, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ProductCard';
import { getProduct, getProducts } from '@/data/store';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { trackPageView, trackProductView, trackProductSelection } from '@/lib/tracking';
import { formatPrice, getCategoryLabel } from '@/lib/utils';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    
    // Load product from store
    const data = getProduct(productId);
    if (data) {
      setProduct(data);
      trackPageView('product', data.category);
      trackProductView(data);
      
      // Set defaults
      if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      
      // Load related products
      const related = getProducts({ category: data.category });
      setRelatedProducts(related.filter((p) => p.id !== productId).slice(0, 4));
    }
    
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, [productId]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    trackProductSelection(size, null);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    trackProductSelection(null, color);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity, selectedSize, selectedColor);
    }
  };

  const discount = product?.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="skeleton h-4 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
            <div className="skeleton aspect-[3/4] rounded-lg" />
            <div className="space-y-4">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-8 w-64" />
              <div className="skeleton h-6 w-32" />
              <div className="skeleton h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center py-24">
            <p className="text-lg font-medium mb-4">Product not found</p>
            <Link to="/products/new-arrivals">
              <Button variant="outline" className="rounded-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-8 lg:py-12" data-testid="product-detail-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6 overflow-x-auto" data-testid="breadcrumb">
          <Link to="/" className="breadcrumb-item whitespace-nowrap">Home</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
          <Link to={`/products/${product.category}`} className="breadcrumb-item whitespace-nowrap">
            {getCategoryLabel(product.category)}
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-secondary">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="product-image"
              />
            </div>
            {discount > 0 && (
              <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-accent text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {getCategoryLabel(product.category)}
            </p>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4" data-testid="product-name">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="text-xl md:text-2xl font-semibold" data-testid="product-price">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="text-base md:text-lg text-muted-foreground line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8" data-testid="product-description">
              {product.description}
            </p>

            <Separator className="my-4 md:my-6" />

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Size</span>
                  <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      data-testid={`size-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="mb-4 md:mb-6">
                <span className="text-sm font-medium block mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor}</span>
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase().replace(/\s+/g, ''),
                      }}
                      title={color}
                      data-testid={`color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {selectedColor === color && (
                        <Check className="absolute inset-0 m-auto h-3 w-3 md:h-4 md:w-4 text-white drop-shadow" strokeWidth={2} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6 md:mb-8">
              <span className="text-sm font-medium block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-secondary rounded-l-full transition-colors"
                    disabled={quantity <= 1}
                    data-testid="qty-decrease"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-10 md:w-12 text-center text-sm md:text-base font-medium" data-testid="qty-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-secondary rounded-r-full transition-colors"
                    data-testid="qty-increase"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={isCartLoading || product.stock === 0}
                className="flex-1 btn-primary h-11 md:h-12"
                data-testid="add-to-cart-btn"
              >
                {isCartLoading ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 md:h-12 md:w-12 rounded-full" data-testid="wishlist-btn">
                <Heart className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                <Truck className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
                <span>30-day free returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 md:mt-16 lg:mt-24" data-testid="related-products">
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-6 md:mb-8">You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Medallia Feedback Placeholder */}
        <section className="mt-12 md:mt-16 py-6 md:py-8 bg-secondary/30 rounded-xl text-center" data-testid="medallia-product-feedback">
          <p className="text-xs md:text-sm text-muted-foreground">
            Found what you were looking for? Let us know!
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
