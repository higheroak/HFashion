/**
 * HFashion Mock Data Store
 * All data is stored in frontend - no backend required
 */

// Product images using picsum.photos for reliable loading
const productImages = {
  // New Arrivals - fashion themed seeds
  nordicKnit: 'https://picsum.photos/seed/cardigan/600/800',
  sageSweater: 'https://picsum.photos/seed/sweater/600/800',
  stackedKnit: 'https://picsum.photos/seed/knitwear/600/800',
  texturedKnit: 'https://picsum.photos/seed/texture/600/800',
  
  // Men's
  blueKurta: 'https://picsum.photos/seed/menblue/600/800',
  geometricShirt: 'https://picsum.photos/seed/shirt/600/800',
  threePieceSuit: 'https://picsum.photos/seed/suit/600/800',
  cordJacket: 'https://picsum.photos/seed/jacket/600/800',
  
  // Women's
  whiteBlouse: 'https://picsum.photos/seed/blouse/600/800',
  ribbedDress: 'https://picsum.photos/seed/dress1/600/800',
  cityDress: 'https://picsum.photos/seed/dress2/600/800',
  linenMaxi: 'https://picsum.photos/seed/maxi/600/800',
  
  // Accessories
  creamClutch: 'https://picsum.photos/seed/clutch/600/800',
  jewelrySet: 'https://picsum.photos/seed/jewelry/600/800',
  sunglasses: 'https://picsum.photos/seed/sunglasses/600/800',
  leatherBelt: 'https://picsum.photos/seed/belt/600/800',
  leatherWatch: 'https://picsum.photos/seed/watch/600/800',
  goldRing: 'https://picsum.photos/seed/ring/600/800',
};

// Hero and category images
export const heroImages = {
  main: 'https://picsum.photos/seed/fashionhero/800/1000',
  secondary: 'https://picsum.photos/seed/accessories/600/400',
  third: 'https://picsum.photos/seed/collection/600/800',
};

export const categoryImages = {
  women: 'https://picsum.photos/seed/womenfashion/600/800',
  men: 'https://picsum.photos/seed/menfashion/600/800',
  accessories: 'https://picsum.photos/seed/accessoriescat/600/800',
};

// Products data
export const products = [
  // New Arrivals
  { id: 'prod-001', name: 'Nordic Knit Cardigan', description: 'Cozy brown cardigan with elegant white nordic pattern. Perfect for layering in autumn and winter.', price: 129.00, original_price: 159.00, category: 'new-arrivals', image_url: productImages.nordicKnit, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Brown', 'Navy', 'Cream'], stock: 10, is_featured: true, is_trending: true },
  { id: 'prod-002', name: 'Sage Collar Sweater', description: 'Soft knit sweater with delicate collar detail. A timeless piece for any wardrobe.', price: 89.00, original_price: null, category: 'new-arrivals', image_url: productImages.sageSweater, sizes: ['XS', 'S', 'M', 'L'], colors: ['Sage', 'Ivory', 'Blush'], stock: 15, is_featured: true, is_trending: false },
  { id: 'prod-003', name: 'Stacked Knit Collection', description: 'Set of layered knit sweaters in earth tones. Mix and match for endless styling options.', price: 199.00, original_price: 249.00, category: 'new-arrivals', image_url: productImages.stackedKnit, sizes: ['S', 'M', 'L'], colors: ['Multi'], stock: 8, is_featured: false, is_trending: true },
  { id: 'prod-004', name: 'Textured Knit Duo', description: 'Two-piece textured knit set in neutral tones. Elegant and comfortable.', price: 159.00, original_price: null, category: 'new-arrivals', image_url: productImages.texturedKnit, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Taupe', 'Olive'], stock: 12, is_featured: false, is_trending: false },
  
  // Men's
  { id: 'prod-005', name: 'Blue Pattern Kurta', description: 'Stylish blue patterned kurta with modern fit. Perfect for casual and semi-formal occasions.', price: 79.00, original_price: null, category: 'men', image_url: productImages.blueKurta, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blue', 'Black'], stock: 20, is_featured: true, is_trending: false },
  { id: 'prod-006', name: 'Geometric Print Shirt', description: 'Bold geometric print shirt for the fashion-forward man. Stand out in any crowd.', price: 69.00, original_price: 89.00, category: 'men', image_url: productImages.geometricShirt, sizes: ['S', 'M', 'L', 'XL'], colors: ['Multi'], stock: 18, is_featured: false, is_trending: true },
  { id: 'prod-007', name: 'Classic Three-Piece Suit', description: 'Timeless charcoal three-piece suit. Impeccable tailoring for the modern gentleman.', price: 449.00, original_price: 549.00, category: 'men', image_url: productImages.threePieceSuit, sizes: ['38', '40', '42', '44', '46'], colors: ['Charcoal', 'Navy', 'Black'], stock: 5, is_featured: true, is_trending: false },
  { id: 'prod-008', name: 'Terracotta Cord Jacket', description: 'Vintage-inspired corduroy jacket in warm terracotta. A statement piece for fall.', price: 189.00, original_price: null, category: 'men', image_url: productImages.cordJacket, sizes: ['S', 'M', 'L', 'XL'], colors: ['Terracotta', 'Forest Green'], stock: 10, is_featured: false, is_trending: false },
  
  // Women's
  { id: 'prod-009', name: 'Sleeveless White Blouse', description: 'Crisp white sleeveless blouse with elegant draping. Essential for any wardrobe.', price: 59.00, original_price: null, category: 'women', image_url: productImages.whiteBlouse, sizes: ['XS', 'S', 'M', 'L'], colors: ['White', 'Ivory', 'Blush'], stock: 25, is_featured: true, is_trending: false },
  { id: 'prod-010', name: 'Ribbed Knit Dress', description: 'Form-fitting ribbed dress with elegant side slit. Sophisticated and comfortable.', price: 119.00, original_price: 149.00, category: 'women', image_url: productImages.ribbedDress, sizes: ['XS', 'S', 'M', 'L'], colors: ['Cream', 'Black', 'Taupe'], stock: 14, is_featured: false, is_trending: true },
  { id: 'prod-011', name: 'City Sky Dress', description: 'Modern silhouette dress perfect for urban adventures. Effortlessly chic.', price: 139.00, original_price: null, category: 'women', image_url: productImages.cityDress, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Sky Blue', 'Charcoal'], stock: 16, is_featured: false, is_trending: false },
  { id: 'prod-012', name: 'Linen Maxi Dress', description: 'Flowing linen maxi dress with puff sleeves. Perfect for summer days.', price: 159.00, original_price: 199.00, category: 'women', image_url: productImages.linenMaxi, sizes: ['XS', 'S', 'M', 'L'], colors: ['Natural', 'Sage', 'Terracotta'], stock: 11, is_featured: true, is_trending: false },
  
  // Accessories
  { id: 'prod-013', name: 'Cream Leather Clutch', description: 'Elegant cream leather clutch with gold hardware. Perfect for evening occasions.', price: 89.00, original_price: null, category: 'accessories', image_url: productImages.creamClutch, sizes: [], colors: ['Cream', 'Black', 'Tan'], stock: 30, is_featured: false, is_trending: true },
  { id: 'prod-014', name: 'Statement Jewelry Set', description: 'Curated jewelry display featuring rings, necklaces, and bracelets.', price: 149.00, original_price: 189.00, category: 'accessories', image_url: productImages.jewelrySet, sizes: [], colors: ['Gold', 'Silver'], stock: 22, is_featured: true, is_trending: false },
  { id: 'prod-015', name: 'Designer Sunglasses', description: 'Bold statement sunglasses with modern frames. UV protection with style.', price: 129.00, original_price: null, category: 'accessories', image_url: productImages.sunglasses, sizes: [], colors: ['Black', 'Tortoise'], stock: 35, is_featured: false, is_trending: false },
  { id: 'prod-016', name: 'Cognac Leather Belt', description: 'Premium leather belt with classic buckle. Timeless craftsmanship.', price: 79.00, original_price: null, category: 'accessories', image_url: productImages.leatherBelt, sizes: ['30', '32', '34', '36', '38'], colors: ['Cognac', 'Black'], stock: 40, is_featured: false, is_trending: false },
  { id: 'prod-017', name: 'Classic Leather Watch', description: 'Minimalist watch with black leather strap. Elegant timekeeping.', price: 199.00, original_price: 249.00, category: 'accessories', image_url: productImages.leatherWatch, sizes: [], colors: ['Black', 'Brown'], stock: 18, is_featured: true, is_trending: false },
  { id: 'prod-018', name: 'Gold Statement Ring', description: 'Bold gold ring with modern geometric design. Make a statement.', price: 69.00, original_price: null, category: 'accessories', image_url: productImages.goldRing, sizes: ['5', '6', '7', '8'], colors: ['Gold', 'Rose Gold'], stock: 50, is_featured: false, is_trending: false },
];

// Demo user
export const demoUser = {
  id: 'demo-user-001',
  name: 'Demo User',
  email: 'demo@hfashion.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  created_at: '2025-01-01T00:00:00Z',
};

// Helper functions
export const getProducts = (filters = {}) => {
  let filtered = [...products];
  
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  if (filters.featured) {
    filtered = filtered.filter(p => p.is_featured);
  }
  if (filters.trending) {
    filtered = filtered.filter(p => p.is_trending);
  }
  
  // Sort
  if (filters.sort === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  }
  
  return filtered;
};

export const getProduct = (productId) => {
  return products.find(p => p.id === productId) || null;
};

export const searchProducts = (query, limit = 10) => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  return products
    .filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit);
};

// Cart state (stored in localStorage)
const CART_KEY = 'hfashion_cart';
const ORDERS_KEY = 'hfashion_orders';

export const getCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading cart:', e);
  }
  return { items: [], total: 0 };
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
};

export const addToCart = (productId, quantity = 1, size = null, color = null) => {
  const product = getProduct(productId);
  if (!product) return null;
  
  const cart = getCart();
  
  // Check if item exists
  const existingIndex = cart.items.findIndex(
    item => item.product_id === productId && item.size === size && item.color === color
  );
  
  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += quantity;
  } else {
    cart.items.push({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      color,
      image_url: product.image_url,
    });
  }
  
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.total = Math.round(cart.total * 100) / 100;
  
  saveCart(cart);
  return cart;
};

export const updateCartItem = (productId, quantity) => {
  const cart = getCart();
  
  if (quantity <= 0) {
    cart.items = cart.items.filter(item => item.product_id !== productId);
  } else {
    const item = cart.items.find(item => item.product_id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.total = Math.round(cart.total * 100) / 100;
  
  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId) => {
  return updateCartItem(productId, 0);
};

export const clearCart = () => {
  const cart = { items: [], total: 0 };
  saveCart(cart);
  return cart;
};

// Orders
export const getOrders = () => {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading orders:', e);
  }
  return [];
};

export const saveOrders = (orders) => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders:', e);
  }
};

export const createOrder = (shippingAddress) => {
  const cart = getCart();
  if (!cart.items.length) return null;
  
  const subtotal = cart.total;
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  
  const order = {
    id: `order-${Date.now()}`,
    order_number: `HF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    user_id: demoUser.id,
    items: [...cart.items],
    subtotal,
    shipping,
    tax,
    total,
    status: 'confirmed',
    shipping_address: shippingAddress,
    tracking_number: `1Z${Math.floor(Math.random() * 900000000) + 100000000}`,
    estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    created_at: new Date().toISOString(),
  };
  
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  
  clearCart();
  
  return order;
};

export const getOrder = (orderId) => {
  const orders = getOrders();
  return orders.find(o => o.id === orderId) || null;
};

export default {
  products,
  demoUser,
  heroImages,
  categoryImages,
  getProducts,
  getProduct,
  searchProducts,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getOrders,
  createOrder,
  getOrder,
};
