import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProduct = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

// Cart
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity = 1, size = null, color = null) => {
  const response = await api.post('/cart/add', {
    product_id: productId,
    quantity,
    size,
    color,
  });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/item/${productId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/item/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data;
};

// Orders
export const createOrder = async (shippingAddress) => {
  const response = await api.post('/orders', { shipping_address: shippingAddress });
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// User
export const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const updateUser = async (data) => {
  const response = await api.put('/user', null, { params: data });
  return response.data;
};

// Seed database
export const seedDatabase = async () => {
  const response = await api.post('/seed');
  return response.data;
};

export default api;
