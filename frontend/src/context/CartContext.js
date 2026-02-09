import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '@/lib/api';
import { trackCartUpdate } from '@/lib/tracking';
import { toast } from 'sonner';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const data = await api.getCart();
      setCart(data);
      trackCartUpdate(data, 'fetch');
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1, size = null, color = null) => {
    setIsLoading(true);
    try {
      const data = await api.addToCart(productId, quantity, size, color);
      setCart(data);
      trackCartUpdate(data, 'add');
      toast.success('Added to cart');
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    setIsLoading(true);
    try {
      const data = await api.updateCartItem(productId, quantity);
      setCart(data);
      trackCartUpdate(data, 'update');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setIsLoading(true);
    try {
      const data = await api.removeFromCart(productId);
      setCart(data);
      trackCartUpdate(data, 'remove');
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCartItems = async () => {
    setIsLoading(true);
    try {
      await api.clearCart();
      setCart({ items: [], total: 0 });
      trackCartUpdate({ items: [], total: 0 }, 'clear');
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart: clearCartItems,
        fetchCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
