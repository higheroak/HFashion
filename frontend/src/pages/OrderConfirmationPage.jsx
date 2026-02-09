import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getOrder } from '@/data/store';
import { formatPrice, formatDate } from '@/lib/utils';
import { trackPageView } from '@/lib/tracking';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackPageView('order-confirmation');
    
    if (orderId) {
      const data = getOrder(orderId);
      setOrder(data);
    }
    setIsLoading(false);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-3xl">
          <div className="text-center py-24">
            <div className="skeleton h-16 w-16 rounded-full mx-auto mb-6" />
            <div className="skeleton h-8 w-64 mx-auto mb-4" />
            <div className="skeleton h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-3xl">
          <div className="text-center py-24">
            <p className="text-lg font-medium mb-4">Order not found</p>
            <Link to="/">
              <Button variant="outline" className="rounded-full">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12 lg:py-16 bg-secondary/20" data-testid="order-confirmation-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 mb-4 md:mb-6">
            <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-green-600" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 md:mb-3">
            Thank You for Your Order!
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card rounded-xl border p-4 md:p-6 lg:p-8 mb-6 md:mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Order Number</p>
              <p className="text-lg md:text-xl font-semibold" data-testid="order-number">{order.order_number}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs md:text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium text-sm md:text-base">{formatDate(order.created_at)}</p>
            </div>
          </div>

          <Separator className="my-4 md:my-6" />

          {/* Delivery Info */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="flex gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base mb-1">Tracking Number</p>
                <p className="text-xs md:text-sm text-muted-foreground" data-testid="tracking-number">
                  {order.tracking_number}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base mb-1">Estimated Delivery</p>
                <p className="text-xs md:text-sm text-muted-foreground" data-testid="estimated-delivery">
                  {order.estimated_delivery}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="flex gap-3 mb-4 md:mb-6">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium text-sm md:text-base mb-1">Shipping Address</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {order.shipping_address.first_name} {order.shipping_address.last_name}<br />
                {order.shipping_address.address}<br />
                {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code}
              </p>
            </div>
          </div>

          <Separator className="my-4 md:my-6" />

          {/* Order Items */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-medium text-sm md:text-base mb-3 md:mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
              Order Items
            </h3>
            <div className="space-y-3 md:space-y-4">
              {order.items?.map((item, index) => (
                <div key={`${item.product_id}-${index}`} className="flex gap-3 md:gap-4">
                  <div className="w-14 h-18 md:w-16 md:h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm md:text-base truncate">{item.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Qty: {item.quantity}
                      {item.size && ` | Size: ${item.size}`}
                      {item.color && ` | Color: ${item.color}`}
                    </p>
                  </div>
                  <p className="font-medium text-sm md:text-base flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4 md:my-6" />

          {/* Order Total */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-base md:text-lg">
              <span>Total</span>
              <span data-testid="order-total">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/account/orders">
            <Button variant="outline" className="w-full sm:w-auto rounded-full" data-testid="view-orders-btn">
              View All Orders
            </Button>
          </Link>
          <Link to="/products/new-arrivals">
            <Button className="w-full sm:w-auto btn-primary" data-testid="continue-shopping-btn">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
