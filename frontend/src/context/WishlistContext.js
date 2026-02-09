import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const WishlistContext = createContext();

const WISHLIST_KEY = 'hfashion_wishlist';

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading wishlist:', e);
    }
  }, []);

  // Save wishlist to localStorage
  const saveWishlist = useCallback((items) => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }, []);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      // Check if already in wishlist
      if (prev.some((item) => item.id === product.id)) {
        toast.info('Already in wishlist');
        return prev;
      }
      
      const newItems = [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.original_price,
        image_url: product.image_url,
        category: product.category,
        added_at: new Date().toISOString(),
      }];
      
      saveWishlist(newItems);
      toast.success('Added to wishlist');
      
      // Track in window.hfashion
      if (typeof window !== 'undefined' && window.hfashion) {
        window.hfashion.wishlistCount = newItems.length;
        window.hfashion.lastWishlistAction = 'add';
        window.hfashion.lastWishlistItem = product.id;
      }
      
      return newItems;
    });
  }, [saveWishlist]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => {
      const newItems = prev.filter((item) => item.id !== productId);
      saveWishlist(newItems);
      toast.success('Removed from wishlist');
      
      // Track in window.hfashion
      if (typeof window !== 'undefined' && window.hfashion) {
        window.hfashion.wishlistCount = newItems.length;
        window.hfashion.lastWishlistAction = 'remove';
        window.hfashion.lastWishlistItem = productId;
      }
      
      return newItems;
    });
  }, [saveWishlist]);

  const toggleWishlist = useCallback((product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [wishlistItems, addToWishlist, removeFromWishlist]);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some((item) => item.id === productId);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    saveWishlist([]);
    toast.success('Wishlist cleared');
  }, [saveWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
