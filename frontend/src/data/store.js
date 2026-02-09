/**
 * HFashion Mock Data Store
 * All data is stored in frontend - no backend required
 */

// Product images using placeholder.co for reliable instant loading
const productImages = {
  // New Arrivals
  nordicKnit: 'https://placehold.co/600x800/e8e4de/4a5d42?text=Nordic+Knit',
  sageSweater: 'https://placehold.co/600x800/d4cfc5/4a5d42?text=Sage+Sweater',
  stackedKnit: 'https://placehold.co/600x800/c9c4ba/4a5d42?text=Stacked+Knit',
  texturedKnit: 'https://placehold.co/600x800/bfb8ae/4a5d42?text=Textured+Knit',
  
  // Men's
  blueKurta: 'https://placehold.co/600x800/a5b4c0/2c2622?text=Blue+Kurta',
  geometricShirt: 'https://placehold.co/600x800/9aabb8/2c2622?text=Geometric+Shirt',
  threePieceSuit: 'https://placehold.co/600x800/5c6670/f5f3ef?text=Three+Piece+Suit',
  cordJacket: 'https://placehold.co/600x800/c4785a/f5f3ef?text=Cord+Jacket',
  
  // Women's
  whiteBlouse: 'https://placehold.co/600x800/f5f3ef/4a5d42?text=White+Blouse',
  ribbedDress: 'https://placehold.co/600x800/e8e4de/4a5d42?text=Ribbed+Dress',
  cityDress: 'https://placehold.co/600x800/a5b4c0/2c2622?text=City+Dress',
  linenMaxi: 'https://placehold.co/600x800/d4cfc5/4a5d42?text=Linen+Maxi',
  
  // Accessories
  creamClutch: 'https://placehold.co/600x800/f5f3ef/c4785a?text=Cream+Clutch',
  jewelrySet: 'https://placehold.co/600x800/d4af37/2c2622?text=Jewelry+Set',
  sunglasses: 'https://placehold.co/600x800/2c2622/f5f3ef?text=Sunglasses',
  leatherBelt: 'https://placehold.co/600x800/8b4513/f5f3ef?text=Leather+Belt',
  leatherWatch: 'https://placehold.co/600x800/2c2622/d4af37?text=Leather+Watch',
  goldRing: 'https://placehold.co/600x800/d4af37/2c2622?text=Gold+Ring',
};

// Hero and category images
export const heroImages = {
  main: 'https://placehold.co/800x1000/e8e4de/4a5d42?text=HFashion',
  secondary: 'https://placehold.co/600x400/d4cfc5/4a5d42?text=Accessories',
  third: 'https://placehold.co/600x800/c9c4ba/4a5d42?text=Collection',
};

export const categoryImages = {
  women: 'https://placehold.co/600x800/e8e4de/4a5d42?text=Women',
  men: 'https://placehold.co/600x800/5c6670/f5f3ef?text=Men',
  accessories: 'https://placehold.co/600x800/d4af37/2c2622?text=Accessories',
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
