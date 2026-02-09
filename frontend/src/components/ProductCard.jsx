import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, getCategoryLabel } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  const { addToCart, isLoading } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1, product.sizes?.[0] || null, product.colors?.[0] || null);
  };

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group block"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted mb-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x800/e8e4de/4a5d42?text=${encodeURIComponent(product.name)}`;
          }}
        />
        
        {/* Badges */}
        {discount > 0 && (
          <span className="sale-badge" data-testid={`sale-badge-${product.id}`}>
            -{discount}%
          </span>
        )}
        {product.is_trending && !discount && (
          <span className="new-badge">Trending</span>
        )}

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3">
          <Button
            onClick={handleQuickAdd}
            disabled={isLoading}
            className="quick-add-btn w-full bg-white text-foreground hover:bg-primary hover:text-white rounded-full text-xs uppercase tracking-wider font-medium py-2"
            data-testid={`quick-add-${product.id}`}
          >
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {getCategoryLabel(product.category)}
        </p>
        <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
