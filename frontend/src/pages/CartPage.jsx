import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { trackPageView } from '@/lib/tracking';

const CartPage = () => {
  const { cart, updateCartItem, removeFromCart, isLoading } = useCart();

  useEffect(() => {
    trackPageView('cart');
  }, []);

  const subtotal = cart.total || 0;
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.items?.length === 0) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Shopping Cart</h1>
          <div className="empty-state py-24">
            <ShoppingBag className="h-20 w-20 text-muted-foreground/20 mb-6" strokeWidth={1} />
            <p className="text-xl font-medium mb-2">Your cart is empty</p>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link to="/products/new-arrivals">
              <Button className="btn-primary" data-testid="start-shopping-btn">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12" data-testid="cart-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.items?.map((item, index) => (
                <div
                  key={`${item.product_id}-${index}`}
                  className="flex gap-4 md:gap-6 p-4 bg-card rounded-xl border"
                  data-testid={`cart-item-${item.product_id}`}
                >
                  <Link to={`/product/${item.product_id}`} className="flex-shrink-0">
                    <div className="w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden bg-secondary">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.product_id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' | '}
                          {item.color && `Color: ${item.color}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        disabled={isLoading}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        data-testid={`remove-${item.product_id}`}
                      >
                        <Trash2 className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() => updateCartItem(item.product_id, item.quantity - 1)}
                          disabled={isLoading || item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-l-full transition-colors disabled:opacity-50"
                          data-testid={`qty-minus-${item.product_id}`}
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.product_id, item.quantity + 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-r-full transition-colors"
                          data-testid={`qty-plus-${item.product_id}`}
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="subtotal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span data-testid="shipping">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span data-testid="tax">{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold mb-6">
                <span>Total</span>
                <span data-testid="total">{formatPrice(total)}</span>
              </div>

              {subtotal < 100 && (
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Add {formatPrice(100 - subtotal)} more for free shipping!
                </p>
              )}

              <Link to="/checkout">
                <Button className="w-full btn-primary h-12 gap-2" data-testid="proceed-checkout-btn">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Button>
              </Link>

              <Link to="/products/new-arrivals" className="block mt-4">
                <Button variant="outline" className="w-full rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
