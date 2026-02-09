import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getOrder } from '@/lib/api';
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusColor } from '@/lib/utils';
import { trackPageView } from '@/lib/tracking';

const statusSteps = [
  { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { status: 'processing', label: 'Processing', icon: Package },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: MapPin },
];

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackPageView('order-tracking');
    
    const loadOrder = async () => {
      try {
        const data = await getOrder(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const getStatusIndex = (status) => {
    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    return statusOrder.indexOf(status);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
          <div className="skeleton h-4 w-48 mb-8" />
          <div className="skeleton h-8 w-64 mb-6" />
          <div className="skeleton h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
          <div className="text-center py-24">
            <p className="text-lg font-medium mb-4">Order not found</p>
            <Link to="/account/orders">
              <Button variant="outline" className="rounded-full">
                View All Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);

  return (
    <div className="min-h-screen py-8 md:py-12" data-testid="order-tracking-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/account" className="breadcrumb-item">Account</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <Link to="/account/orders" className="breadcrumb-item">Orders</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-foreground font-medium">{order.order_number}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-semibold" data-testid="order-number">
              Order {order.order_number}
            </h1>
            <p className="text-muted-foreground mt-1">
              Placed on {formatDate(order.created_at)}
            </p>
          </div>
          <Badge className={`${getOrderStatusColor(order.status)} text-sm px-4 py-1`}>
            {getOrderStatusLabel(order.status)}
          </Badge>
        </div>

        {/* Tracking Progress */}
        <div className="bg-card rounded-xl border p-6 md:p-8 mb-8">
          <h2 className="font-semibold mb-6">Order Status</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-border" />
            <div 
              className="absolute left-[18px] top-0 w-0.5 bg-primary transition-all duration-500"
              style={{ height: `${Math.min(100, (currentStatusIndex / (statusSteps.length - 1)) * 100)}%` }}
            />

            {/* Steps */}
            <div className="space-y-8">
              {statusSteps.map((step, index) => {
                const isCompleted = currentStatusIndex >= index;
                const isCurrent = getStatusIndex(order.status) === index;
                
                return (
                  <div key={step.status} className="relative flex gap-4" data-testid={`status-${step.status}`}>
                    <div
                      className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      <step.icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </p>
                      {isCurrent && order.status !== 'delivered' && (
                        <p className="text-sm text-muted-foreground mt-1">
                          In progress...
                        </p>
                      )}
                      {step.status === 'shipped' && order.tracking_number && currentStatusIndex >= index && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Tracking: {order.tracking_number}
                        </p>
                      )}
                      {step.status === 'delivered' && currentStatusIndex >= index && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated: {order.estimated_delivery}
                        </p>
                      )}
                    </div>
                    {isCurrent && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-primary animate-pulse" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Items */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-14 h-18 rounded overflow-hidden bg-secondary flex-shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Qty: {item.quantity}
                      {item.size && ` | ${item.size}`}
                    </p>
                  </div>
                  <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Shipping Information</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                <p className="font-medium">
                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.shipping_address.address}<br />
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code}<br />
                  {order.shipping_address.country}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contact</p>
                <p className="text-sm">{order.shipping_address.phone}</p>
              </div>

              {order.tracking_number && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                  <p className="font-medium font-mono text-sm">{order.tracking_number}</p>
                </div>
              )}

              {order.estimated_delivery && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-medium">{order.estimated_delivery}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/account/orders">
            <Button variant="outline" className="w-full sm:w-auto rounded-full">
              Back to Orders
            </Button>
          </Link>
          <Link to="/products/new-arrivals">
            <Button className="w-full sm:w-auto btn-primary">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
