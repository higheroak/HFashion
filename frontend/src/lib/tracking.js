/**
 * HFashion User Activity Tracking
 * 
 * This module manages all window variables for user activity tracking.
 * Variables are stored in window.hfashion object for Medallia DXA integration.
 */

// Medallia SPA Page View Tracking
const triggerMedalliaSPA = () => {
  if (typeof window !== 'undefined') {
    try {
      if (window.KAMPYLE_ONSITE_SDK && typeof window.KAMPYLE_ONSITE_SDK.updatePageView === 'function') {
        window.KAMPYLE_ONSITE_SDK.updatePageView();
        console.log('[Medallia SPA] Page view updated');
      }
    } catch (error) {
      console.error('[Medallia SPA] Error updating page view:', error);
    }
  }
};

// Initialize tracking object
const initTracking = () => {
  if (typeof window !== 'undefined') {
    window.hfashion = window.hfashion || {
      // Session
      sessionId: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionStart: new Date().toISOString(),
      isLoggedIn: true,
      userId: 'demo-user-001',
      userName: 'Demo User',
      
      // Cart
      cartValue: 0,
      cartItemCount: 0,
      cartItems: [],
      cartLastUpdated: null,
      cartAction: null,
      
      // Product
      currentProduct: null,
      productCategory: null,
      productPrice: null,
      productViewTime: null,
      selectedSize: null,
      selectedColor: null,
      
      // Checkout
      checkout: null,
      checkoutStep: 0,
      checkoutValue: 0,
      shippingMethod: null,
      paymentMethod: null,
      
      // Order
      orderComplete: false,
      orderNumber: null,
      orderTotal: 0,
      orderItemCount: 0,
      orderDate: null,
      
      // Navigation
      currentPage: 'home',
      previousPage: null,
      pageCategory: null,
      searchQuery: null,
      sortBy: null,
      filterApplied: {},
      
      // Engagement
      pageViews: 0,
      productsViewed: [],
      timeOnSite: 0,
      scrollDepth: 0,
      lastInteraction: new Date().toISOString(),
      
      // Events
      lastEvent: null,
      eventHistory: [],
    };
    
    // Start time on site tracker
    setInterval(() => {
      if (window.hfashion) {
        window.hfashion.timeOnSite += 1;
      }
    }, 1000);
    
    // Track scroll depth
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (window.hfashion && scrollPercent > window.hfashion.scrollDepth) {
        window.hfashion.scrollDepth = scrollPercent;
      }
    });
  }
};

// Track page view
export const trackPageView = (pageName, category = null) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    window.hfashion.previousPage = window.hfashion.currentPage;
    window.hfashion.currentPage = pageName;
    window.hfashion.pageCategory = category;
    window.hfashion.pageViews += 1;
    window.hfashion.lastInteraction = new Date().toISOString();
    
    trackEvent('page_view', { page: pageName, category });
    
    // Trigger Medallia SPA page view
    triggerMedalliaSPA();
  }
};

// Track product view
export const trackProductView = (product) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    window.hfashion.currentProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    };
    window.hfashion.productCategory = product.category;
    window.hfashion.productPrice = product.price;
    window.hfashion.productViewTime = new Date().toISOString();
    window.hfashion.selectedSize = null;
    window.hfashion.selectedColor = null;
    
    if (!window.hfashion.productsViewed.includes(product.id)) {
      window.hfashion.productsViewed.push(product.id);
    }
    
    trackEvent('product_view', { productId: product.id, productName: product.name });
    
    // Trigger Medallia SPA page view
    triggerMedalliaSPA();
  }
};

// Track product selection
export const trackProductSelection = (size, color) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    if (size) window.hfashion.selectedSize = size;
    if (color) window.hfashion.selectedColor = color;
    window.hfashion.lastInteraction = new Date().toISOString();
  }
};

// Track cart update
export const trackCartUpdate = (cart, action) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    window.hfashion.cartValue = cart.total || 0;
    window.hfashion.cartItemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    window.hfashion.cartItems = cart.items?.map(item => ({
      id: item.product_id,
      name: item.name,
      price: item.price,
      qty: item.quantity,
    })) || [];
    window.hfashion.cartLastUpdated = new Date().toISOString();
    window.hfashion.cartAction = action;
    window.hfashion.lastInteraction = new Date().toISOString();
    
    trackEvent(`cart_${action}`, { cartValue: cart.total, itemCount: window.hfashion.cartItemCount });
    
    // Trigger Medallia SPA page view on cart update
    triggerMedalliaSPA();
  }
};

// Track checkout progress
export const trackCheckout = (step, status, value = null) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    window.hfashion.checkout = status;
    window.hfashion.checkoutStep = step;
    if (value !== null) window.hfashion.checkoutValue = value;
    window.hfashion.lastInteraction = new Date().toISOString();
    
    trackEvent('checkout_progress', { step, status, value });
    
    // Trigger Medallia SPA page view on checkout update
    triggerMedalliaSPA();
  }
};

// Track shipping/payment selection
export const trackCheckoutSelection = (type, value) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    if (type === 'shipping') window.hfashion.shippingMethod = value;
    if (type === 'payment') window.hfashion.paymentMethod = value;
    window.hfashion.lastInteraction = new Date().toISOString();
  }
};

// Track order completion
export const trackOrderComplete = (order) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    window.hfashion.orderComplete = true;
    window.hfashion.orderNumber = order.order_number;
    window.hfashion.orderTotal = order.total;
    window.hfashion.orderItemCount = order.items?.length || 0;
    window.hfashion.orderDate = new Date().toISOString();
    window.hfashion.checkout = 'complete';
    window.hfashion.checkoutStep = 4;
    
    // Reset cart
    window.hfashion.cartValue = 0;
    window.hfashion.cartItemCount = 0;
    window.hfashion.cartItems = [];
    window.hfashion.cartAction = 'clear';
    
    trackEvent('order_complete', { 
      orderNumber: order.order_number, 
      orderTotal: order.total,
      itemCount: window.hfashion.orderItemCount 
    });
    
    // Trigger Medallia SPA page view on order completion
    triggerMedalliaSPA();
  }
};

// Track search
export const trackSearch = (query) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    window.hfashion.searchQuery = query;
    window.hfashion.lastInteraction = new Date().toISOString();
    
    trackEvent('search', { query });
  }
};

// Track filter/sort
export const trackFilter = (filterType, value) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    if (filterType === 'sort') {
      window.hfashion.sortBy = value;
    } else {
      window.hfashion.filterApplied = {
        ...window.hfashion.filterApplied,
        [filterType]: value,
      };
    }
    window.hfashion.lastInteraction = new Date().toISOString();
    
    trackEvent('filter_applied', { filterType, value });
  }
};

// Generic event tracker
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.hfashion) {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
    };
    
    window.hfashion.lastEvent = event;
    window.hfashion.eventHistory = [
      event,
      ...(window.hfashion.eventHistory || []).slice(0, 49), // Keep last 50 events
    ];
    
    // Console log for debugging
    console.log('[HFashion Tracking]', eventName, eventData);
  }
};

// Initialize on module load
initTracking();

export default {
  trackPageView,
  trackProductView,
  trackProductSelection,
  trackCartUpdate,
  trackCheckout,
  trackCheckoutSelection,
  trackOrderComplete,
  trackSearch,
  trackFilter,
  trackEvent,
};
