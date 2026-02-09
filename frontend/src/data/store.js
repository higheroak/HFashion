/**
 * HFashion Mock Data Store
 * Frontend-only - all data stored in localStorage
 */

// Real fashion stock photos from Unsplash - Clean studio backgrounds for consistent sophisticated look
const productImages = {
  // New Arrivals - Knitwear (earth tones, neutral backgrounds)
  nordicKnit: 'https://images.unsplash.com/photo-1671643417206-f407759ec712?w=600&h=800&fit=crop&crop=center', // Woman in turtleneck, warm brown bg
  sageSweater: 'https://images.unsplash.com/photo-1687275167528-5aac76c3e782?w=600&h=800&fit=crop&crop=center', // Woman sage sweater, light grey bg
  cableKnit: 'https://images.unsplash.com/photo-1687275162537-b00d99c3ec46?w=600&h=800&fit=crop&crop=center', // Pink sweater, light bg
  cashmereKnit: 'https://images.unsplash.com/photo-1762509547577-76aa7cf87c62?w=600&h=800&fit=crop&crop=center', // Woman white dress, light blue bg
  
  // Men's (professional, clean backgrounds)
  oxfordShirt: 'https://images.unsplash.com/photo-1656453260437-4f4da3ef81dc?w=600&h=800&fit=crop&crop=center', // Blue shirt tie, grey bg
  geometricShirt: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&crop=center', // Folded shirt, clean bg
  threePieceSuit: 'https://images.unsplash.com/photo-1661854236305-b02cef4aa0af?w=600&h=800&fit=crop&crop=center', // Man blue suit, grey wall bg
  navyBlazer: 'https://images.unsplash.com/photo-1608461864721-b8f50c91c147?w=600&h=800&fit=crop&crop=center', // Belt detail, neutral bg
  
  // Women's (elegant, studio style)
  whiteBlouse: 'https://images.unsplash.com/photo-1590588503756-08a4b2be5eb9?w=600&h=800&fit=crop&crop=center', // Woman white blazer, light bg
  womenBlazer: 'https://images.unsplash.com/photo-1734341739615-71be2b1cdb06?w=600&h=800&fit=crop&crop=center', // Woman black dress, dark gradient bg
  midiSkirt: 'https://images.unsplash.com/photo-1578483570097-eb36f3b58fc0?w=600&h=800&fit=crop&crop=center', // Woman skirt, light neutral bg
  linenMaxi: 'https://images.unsplash.com/photo-1763652309790-c0f90e5c6bd8?w=600&h=800&fit=crop&crop=center', // White pleated dress, cream bg
  
  // Accessories (product photography style, clean backgrounds)
  creamClutch: 'https://images.unsplash.com/photo-1575403538007-acb790100421?w=600&h=800&fit=crop&crop=center', // Grey handbag, stacked books
  jewelrySet: 'https://images.unsplash.com/photo-1583791030450-950c8e4a2a8e?w=600&h=800&fit=crop&crop=center', // Gold necklace, white textile
  sunglasses: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop&crop=center', // Black sunglasses, white bg
  leatherBelt: 'https://images.unsplash.com/photo-1734383524180-3c6f9b21e8e3?w=600&h=800&fit=crop&crop=center', // Brown belt, teal bg
  leatherWatch: 'https://images.unsplash.com/photo-1758887952896-8491d393afe2?w=600&h=800&fit=crop&crop=center', // Black watch, white bg
  goldRing: 'https://images.unsplash.com/photo-1723361656062-ed14986c7f1a?w=600&h=800&fit=crop&crop=center', // Gold rings, white bg
};

// Hero and category images - Clean backgrounds for sophisticated look
export const heroImages = {
  main: 'https://images.unsplash.com/photo-1632162451352-df77c3013f25?w=800&h=1000&fit=crop&crop=center', // Woman in trench coat, neutral bg
  secondary: 'https://images.unsplash.com/photo-1760624294582-5341f33f9fa4?w=600&h=400&fit=crop&crop=center', // Leather tote bags, clean white bg
  third: 'https://images.unsplash.com/photo-1741605037162-b1f475a4a4d3?w=600&h=800&fit=crop&crop=center', // Woman elegant pose, brown solid bg
};

export const categoryImages = {
  women: 'https://images.unsplash.com/photo-1632162451352-df77c3013f25?w=600&h=800&fit=crop&crop=center', // Woman trench coat, neutral bg
  men: 'https://images.unsplash.com/photo-1661854236305-b02cef4aa0af?w=600&h=800&fit=crop&crop=center', // Man suit, grey bg
  accessories: 'https://images.unsplash.com/photo-1583791030450-950c8e4a2a8e?w=600&h=800&fit=crop&crop=center', // Gold jewelry, white bg
};

// Products data - US/UK focused fashion
export const products = [
  // New Arrivals
  { id: 'prod-001', name: 'Nordic Knit Cardigan', description: 'Cozy brown cardigan with elegant white nordic pattern. Perfect for layering in autumn and winter.', price: 129.00, original_price: 159.00, category: 'new-arrivals', image_url: productImages.nordicKnit, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Brown', 'Navy', 'Cream'], stock: 10, is_featured: true, is_trending: true },
  { id: 'prod-002', name: 'Sage Collar Sweater', description: 'Soft knit sweater with delicate collar detail. A timeless piece for any wardrobe.', price: 89.00, original_price: null, category: 'new-arrivals', image_url: productImages.sageSweater, sizes: ['XS', 'S', 'M', 'L'], colors: ['Sage', 'Ivory', 'Blush'], stock: 15, is_featured: true, is_trending: false },
  { id: 'prod-003', name: 'Cable Knit Pullover', description: 'Classic cable knit sweater in cream wool. Essential layering piece for the colder months.', price: 119.00, original_price: 149.00, category: 'new-arrivals', image_url: productImages.cableKnit, sizes: ['S', 'M', 'L', 'XL'], colors: ['Cream', 'Charcoal', 'Navy'], stock: 8, is_featured: false, is_trending: true },
  { id: 'prod-004', name: 'Cashmere Crewneck', description: 'Luxurious cashmere crewneck sweater. Soft, warm, and effortlessly elegant.', price: 189.00, original_price: null, category: 'new-arrivals', image_url: productImages.cashmereKnit, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Beige', 'Black', 'Grey'], stock: 12, is_featured: false, is_trending: false },
  
  // Men's
  { id: 'prod-005', name: 'Classic Oxford Shirt', description: 'Timeless blue oxford button-down shirt. Perfect for work or weekend smart-casual looks.', price: 79.00, original_price: null, category: 'men', image_url: productImages.oxfordShirt, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blue', 'White', 'Pink'], stock: 20, is_featured: true, is_trending: false },
  { id: 'prod-006', name: 'Geometric Print Shirt', description: 'Bold geometric print shirt for the fashion-forward man. Stand out in any crowd.', price: 69.00, original_price: 89.00, category: 'men', image_url: productImages.geometricShirt, sizes: ['S', 'M', 'L', 'XL'], colors: ['Multi'], stock: 18, is_featured: false, is_trending: true },
  { id: 'prod-007', name: 'Classic Three-Piece Suit', description: 'Timeless charcoal three-piece suit. Impeccable tailoring for the modern gentleman.', price: 449.00, original_price: 549.00, category: 'men', image_url: productImages.threePieceSuit, sizes: ['38', '40', '42', '44', '46'], colors: ['Charcoal', 'Navy', 'Black'], stock: 5, is_featured: true, is_trending: false },
  { id: 'prod-008', name: 'Navy Double-Breasted Blazer', description: 'Sharp double-breasted blazer with gold buttons. A wardrobe essential for smart occasions.', price: 229.00, original_price: null, category: 'men', image_url: productImages.navyBlazer, sizes: ['S', 'M', 'L', 'XL'], colors: ['Navy', 'Black'], stock: 10, is_featured: false, is_trending: false },
  
  // Women's
  { id: 'prod-009', name: 'Sleeveless White Blouse', description: 'Crisp white sleeveless blouse with elegant draping. Essential for any wardrobe.', price: 59.00, original_price: null, category: 'women', image_url: productImages.whiteBlouse, sizes: ['XS', 'S', 'M', 'L'], colors: ['White', 'Ivory', 'Blush'], stock: 25, is_featured: true, is_trending: false },
  { id: 'prod-010', name: 'Tailored Navy Blazer', description: 'Sophisticated navy blazer with contrast cuffs. Elevate any outfit instantly.', price: 179.00, original_price: 219.00, category: 'women', image_url: productImages.womenBlazer, sizes: ['XS', 'S', 'M', 'L'], colors: ['Navy', 'Black', 'Camel'], stock: 14, is_featured: false, is_trending: true },
  { id: 'prod-011', name: 'Autumn Midi Skirt', description: 'Elegant patterned midi skirt perfect for fall. Pairs beautifully with boots or heels.', price: 89.00, original_price: null, category: 'women', image_url: productImages.midiSkirt, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Floral', 'Plaid'], stock: 16, is_featured: false, is_trending: false },
  { id: 'prod-012', name: 'Linen Maxi Dress', description: 'Flowing linen maxi dress with puff sleeves. Perfect for summer days.', price: 159.00, original_price: 199.00, category: 'women', image_url: productImages.linenMaxi, sizes: ['XS', 'S', 'M', 'L'], colors: ['Natural', 'Sage', 'Terracotta'], stock: 11, is_featured: true, is_trending: false },
  
  // Accessories
  { id: 'prod-013', name: 'Cream Leather Clutch', description: 'Elegant cream leather clutch with gold hardware. Perfect for evening occasions.', price: 89.00, original_price: null, category: 'accessories', image_url: productImages.creamClutch, sizes: [], colors: ['Cream', 'Black', 'Tan'], stock: 30, is_featured: false, is_trending: true },
  { id: 'prod-014', name: 'Statement Jewelry Set', description: 'Curated jewelry set featuring rings, necklaces, and bracelets in gold tones.', price: 149.00, original_price: 189.00, category: 'accessories', image_url: productImages.jewelrySet, sizes: [], colors: ['Gold', 'Silver'], stock: 22, is_featured: true, is_trending: false },
  { id: 'prod-015', name: 'Designer Sunglasses', description: 'Classic aviator sunglasses with premium lenses. UV protection with timeless style.', price: 129.00, original_price: null, category: 'accessories', image_url: productImages.sunglasses, sizes: [], colors: ['Gold', 'Silver', 'Black'], stock: 35, is_featured: false, is_trending: false },
  { id: 'prod-016', name: 'Cognac Leather Belt', description: 'Premium leather belt with classic buckle. Timeless craftsmanship.', price: 79.00, original_price: null, category: 'accessories', image_url: productImages.leatherBelt, sizes: ['30', '32', '34', '36', '38'], colors: ['Cognac', 'Black'], stock: 40, is_featured: false, is_trending: false },
  { id: 'prod-017', name: 'Classic Leather Watch', description: 'Minimalist watch with brown leather strap. Elegant timekeeping for any occasion.', price: 199.00, original_price: 249.00, category: 'accessories', image_url: productImages.leatherWatch, sizes: [], colors: ['Brown', 'Black'], stock: 18, is_featured: true, is_trending: false },
  { id: 'prod-018', name: 'Gold Statement Ring', description: 'Bold gold ring with modern geometric design. Make a statement.', price: 69.00, original_price: null, category: 'accessories', image_url: productImages.goldRing, sizes: ['5', '6', '7', '8'], colors: ['Gold', 'Rose Gold'], stock: 50, is_featured: false, is_trending: false },
];

// Demo user
export const demoUser = {
  id: 'demo-user-001',
  name: 'Demo User',
  email: 'demo@hfashion.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
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
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
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
