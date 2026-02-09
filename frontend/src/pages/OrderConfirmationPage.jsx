import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { getOrder } from '../lib/api';
import { formatPrice, formatDate } from '../lib/utils';
import { trackPageView } from '../lib/tracking';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackPageView('order-confirmation');
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 md:py-12">
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
      <div className="min-h-screen py-8 md:py-12">
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
    <div className="min-h-screen py-8 md:py-16 bg-secondary/20" data-testid="order-confirmation-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-3">
            Thank You for Your Order!
          </h1>
          <p className="text-muted-foreground">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card rounded-xl border p-6 md:p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-xl font-semibold" data-testid="order-number">{order.order_number}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{formatDate(order.created_at)}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Delivery Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-medium mb-1">Tracking Number</p>
                <p className="text-sm text-muted-foreground" data-testid="tracking-number">
                  {order.tracking_number}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-medium mb-1">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground" data-testid="estimated-delivery">
                  {order.estimated_delivery}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium mb-1">Shipping Address</p>
              <p className="text-sm text-muted-foreground">
                {order.shipping_address.first_name} {order.shipping_address.last_name}<br />
                {order.shipping_address.address}<br />
                {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" strokeWidth={1.5} />
              Order Items
            </h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={`${item.product_id}-${index}`} className="flex gap-4">
                  <div className="w-16 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Qty: {item.quantity}
                      {item.size && ` | Size: ${item.size}`}
                      {item.color && ` | Color: ${item.color}`}
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Order Total */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span data-testid="order-total">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
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

        {/* Medallia Feedback Placeholder */}
        <div className="mt-12 p-6 bg-card rounded-xl border text-center" data-testid="medallia-order-feedback">
          <p className="text-muted-foreground text-sm">
            {/* Medallia Digital Feedback for order confirmation */}
            How was your checkout experience? We'd love your feedback!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
