import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Minus, Plus, Heart, Truck, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ProductCard';
import { getProduct, getProducts } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { trackPageView, trackProductView, trackProductSelection } from '@/lib/tracking';
import { formatPrice, getCategoryLabel } from '@/lib/utils';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart, isLoading: isCartLoading } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const data = await getProduct(productId);
        setProduct(data);
        trackPageView('product', data.category);
        trackProductView(data);
        
        // Set defaults
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        
        // Load related products
        const related = await getProducts({ category: data.category });
        setRelatedProducts(related.filter((p) => p.id !== productId).slice(0, 4));
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
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
      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="skeleton h-4 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
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
      <div className="min-h-screen py-8 md:py-12">
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
    <div className="min-h-screen py-8 md:py-12" data-testid="product-detail-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6" data-testid="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <Link to={`/products/${product.category}`} className="breadcrumb-item">
            {getCategoryLabel(product.category)}
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
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
              <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-3 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {getCategoryLabel(product.category)}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-4" data-testid="product-name">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-semibold" data-testid="product-price">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8" data-testid="product-description">
              {product.description}
            </p>

            <Separator className="my-6" />

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
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
              <div className="mb-6">
                <span className="text-sm font-medium block mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor}</span>
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase().replace(/\s+/g, ''),
                      }}
                      title={color}
                      data-testid={`color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {selectedColor === color && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" strokeWidth={2} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-medium block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-l-full transition-colors"
                    disabled={quantity <= 1}
                    data-testid="qty-decrease"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-12 text-center font-medium" data-testid="qty-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-r-full transition-colors"
                    data-testid="qty-increase"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={isCartLoading || product.stock === 0}
                className="flex-1 btn-primary h-12"
                data-testid="add-to-cart-btn"
              >
                {isCartLoading ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" data-testid="wishlist-btn">
                <Heart className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="h-5 w-5" strokeWidth={1.5} />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <RefreshCw className="h-5 w-5" strokeWidth={1.5} />
                <span>30-day free returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24" data-testid="related-products">
            <h2 className="font-serif text-2xl font-semibold mb-8">You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Medallia Feedback Placeholder */}
        <section className="mt-16 py-8 bg-secondary/30 rounded-xl text-center" data-testid="medallia-product-feedback">
          <p className="text-sm text-muted-foreground">
            {/* Medallia Digital Feedback for product page */}
            Found what you were looking for? Let us know!
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
