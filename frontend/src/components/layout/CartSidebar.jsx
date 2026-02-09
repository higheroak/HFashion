import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';

const CartSidebar = ({ open, onOpenChange }) => {
  const { cart, updateCartItem, removeFromCart, isLoading } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Shopping Bag</SheetTitle>
        </SheetHeader>

        {cart.items?.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" strokeWidth={1} />
            <p className="text-lg font-medium mb-2">Your bag is empty</p>
            <p className="text-sm text-muted-foreground mb-6">
              Discover our collections and add your favorites
            </p>
            <Link to="/products/new-arrivals" onClick={() => onOpenChange(false)}>
              <Button className="btn-primary" data-testid="continue-shopping-btn">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cart.items?.map((item, index) => (
                  <div key={`${item.product_id}-${index}`} className="flex gap-4" data-testid={`cart-item-${item.product_id}`}>
                    <div className="w-20 h-24 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium truncate pr-4">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && ' / '}
                            {item.color && `Color: ${item.color}`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          disabled={isLoading}
                          data-testid={`remove-item-${item.product_id}`}
                        >
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartItem(item.product_id, item.quantity - 1)}
                            className="qty-btn"
                            disabled={isLoading || item.quantity <= 1}
                            data-testid={`qty-minus-${item.product_id}`}
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.product_id, item.quantity + 1)}
                            className="qty-btn"
                            disabled={isLoading}
                            data-testid={`qty-plus-${item.product_id}`}
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(cart.total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <Separator />
              <div className="grid gap-2">
                <Link to="/checkout" onClick={() => onOpenChange(false)}>
                  <Button className="w-full btn-primary" data-testid="checkout-btn">
                    Checkout
                  </Button>
                </Link>
                <Link to="/cart" onClick={() => onOpenChange(false)}>
                  <Button variant="outline" className="w-full rounded-full" data-testid="view-cart-btn">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
