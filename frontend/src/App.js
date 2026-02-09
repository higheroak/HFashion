import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import ProductListPage from "@/pages/ProductListPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import AccountPage from "@/pages/AccountPage";
import OrderTrackingPage from "@/pages/OrderTrackingPage";
import SearchResultsPage from "@/pages/SearchResultsPage";
import { initMedallia } from "@/config/medallia";
import "@/lib/tracking";

function App() {
  useEffect(() => {
    // Initialize Medallia configuration
    initMedallia();
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="App flex flex-col min-h-screen">
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:category" element={<ProductListPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/orders" element={<AccountPage />} />
                <Route path="/account/orders/:orderId" element={<OrderTrackingPage />} />
                <Route path="/account/addresses" element={<AccountPage />} />
                <Route path="/account/wishlist" element={<AccountPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
          <Toaster position="bottom-right" richColors />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
