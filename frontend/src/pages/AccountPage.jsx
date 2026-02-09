import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getUser, getOrders } from '@/lib/api';
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusColor } from '@/lib/utils';
import { trackPageView } from '@/lib/tracking';

const navItems = [
  { id: 'profile', label: 'Profile', icon: User, href: '/account' },
  { id: 'orders', label: 'Orders', icon: Package, href: '/account/orders' },
  { id: 'addresses', label: 'Addresses', icon: MapPin, href: '/account/addresses' },
  { id: 'wishlist', label: 'Wishlist', icon: Heart, href: '/account/wishlist' },
];

const AccountPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentTab = location.pathname.split('/').pop() || 'account';

  useEffect(() => {
    trackPageView('account');
    
    const loadData = async () => {
      try {
        const [userData, ordersData] = await Promise.all([
          getUser(),
          getOrders(),
        ]);
        setUser(userData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error loading account data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-32 w-full rounded-xl" />
          <div className="skeleton h-32 w-full rounded-xl" />
        </div>
      );
    }

    // Profile Tab
    if (currentTab === 'account' || currentTab === 'profile') {
      return (
        <div data-testid="profile-section">
          <h2 className="font-serif text-2xl font-semibold mb-6">My Profile</h2>
          
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-white text-xl font-semibold">
                    {user?.name?.[0] || 'D'}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg" data-testid="user-name">{user?.name}</h3>
                <p className="text-sm text-muted-foreground" data-testid="user-email">{user?.email}</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                <p className="font-medium">{user?.created_at ? formatDate(user.created_at) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Account Type</p>
                <p className="font-medium">Demo Account</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-card rounded-xl border p-4 text-center">
              <p className="text-2xl font-semibold text-primary">{orders.length}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
            <div className="bg-card rounded-xl border p-4 text-center">
              <p className="text-2xl font-semibold text-primary">0</p>
              <p className="text-sm text-muted-foreground">Wishlist Items</p>
            </div>
            <div className="bg-card rounded-xl border p-4 text-center hidden md:block">
              <p className="text-2xl font-semibold text-primary">1</p>
              <p className="text-sm text-muted-foreground">Saved Addresses</p>
            </div>
          </div>
        </div>
      );
    }

    // Orders Tab
    if (currentTab === 'orders') {
      return (
        <div data-testid="orders-section">
          <h2 className="font-serif text-2xl font-semibold mb-6">Order History</h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border">
              <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" strokeWidth={1} />
              <p className="font-medium mb-2">No orders yet</p>
              <p className="text-sm text-muted-foreground mb-6">Start shopping to see your orders here</p>
              <Link to="/products/new-arrivals">
                <Button className="btn-primary">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  to={`/account/orders/${order.id}`}
                  className="block bg-card rounded-xl border p-4 md:p-6 hover:border-primary/30 transition-colors"
                  data-testid={`order-${order.order_number}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-semibold">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getOrderStatusColor(order.status)}>
                        {getOrderStatusLabel(order.status)}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {order.items?.slice(0, 4).map((item, index) => (
                      <div key={index} className="w-14 h-18 rounded overflow-hidden bg-secondary flex-shrink-0">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items?.length > 4 && (
                      <div className="w-14 h-18 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                        <span className="text-sm text-muted-foreground">+{order.items.length - 4}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-sm text-muted-foreground">{order.items?.length} item(s)</span>
                    <span className="font-semibold">{formatPrice(order.total)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Addresses Tab
    if (currentTab === 'addresses') {
      return (
        <div data-testid="addresses-section">
          <h2 className="font-serif text-2xl font-semibold mb-6">Saved Addresses</h2>
          
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-start justify-between mb-4">
              <Badge variant="secondary">Default</Badge>
            </div>
            <p className="font-medium">Demo User</p>
            <p className="text-sm text-muted-foreground mt-2">
              123 Fashion Street<br />
              New York, NY 10001<br />
              United States<br />
              (555) 123-4567
            </p>
          </div>
        </div>
      );
    }

    // Wishlist Tab
    if (currentTab === 'wishlist') {
      return (
        <div data-testid="wishlist-section">
          <h2 className="font-serif text-2xl font-semibold mb-6">My Wishlist</h2>
          
          <div className="text-center py-12 bg-card rounded-xl border">
            <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" strokeWidth={1} />
            <p className="font-medium mb-2">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mb-6">Save items you love by clicking the heart icon</p>
            <Link to="/products/new-arrivals">
              <Button className="btn-primary">Explore Products</Button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12" data-testid="account-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-card rounded-xl border p-4 sticky top-24">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = 
                    (item.id === 'profile' && (currentTab === 'account' || currentTab === 'profile')) ||
                    currentTab === item.id;
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`account-nav-item ${isActive ? 'active' : ''}`}
                      data-testid={`nav-${item.id}`}
                    >
                      <item.icon className="h-5 w-5" strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              
              <Separator className="my-4" />
              
              <button className="account-nav-item w-full text-destructive hover:bg-destructive/10">
                <LogOut className="h-5 w-5" strokeWidth={1.5} />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {renderContent()}
          </main>
        </div>

        {/* Medallia Feedback Placeholder */}
        <div className="mt-12 p-6 bg-secondary/30 rounded-xl text-center" data-testid="medallia-account-feedback">
          <p className="text-sm text-muted-foreground">
            {/* Medallia Digital Feedback for account page */}
            How can we improve your account experience?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
