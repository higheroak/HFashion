import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Check, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/api';
import { formatPrice } from '../lib/utils';
import { trackPageView, trackCheckout, trackCheckoutSelection, trackOrderComplete } from '../lib/tracking';
import { toast } from 'sonner';

const steps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: ShieldCheck },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    first_name: 'Demo',
    last_name: 'User',
    address: '123 Fashion Street',
    city: 'New York',
    state: 'NY',
    zip_code: '10001',
    country: 'United States',
    phone: '(555) 123-4567',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    trackPageView('checkout');
    trackCheckout(1, 'started', cart.total);
    
    if (cart.items?.length === 0) {
      navigate('/cart');
    }
  }, [cart.items, cart.total, navigate]);

  const subtotal = cart.total || 0;
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate shipping info
      const required = ['first_name', 'last_name', 'address', 'city', 'state', 'zip_code', 'phone'];
      const missing = required.filter((field) => !shippingInfo[field]);
      if (missing.length > 0) {
        toast.error('Please fill in all required fields');
        return;
      }
      trackCheckout(2, 'shipping', total);
    }
    if (currentStep === 2) {
      trackCheckoutSelection('payment', paymentMethod);
      trackCheckout(3, 'review', total);
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const order = await createOrder(shippingInfo);
      trackOrderComplete(order);
      await fetchCart();
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items?.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 md:py-12 bg-secondary/20" data-testid="checkout-page">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/cart" className="breadcrumb-item">Cart</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-foreground font-medium">Checkout</span>
        </nav>

        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentStep > step.id
                      ? 'bg-green-600 text-white'
                      : currentStep === step.id
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                  data-testid={`step-${step.id}`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" strokeWidth={2} />
                  ) : (
                    <step.icon className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </div>
                <span className={`hidden md:block text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-green-600' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border p-6 md:p-8">
              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <div className="animate-fade-in" data-testid="shipping-step">
                  <h2 className="font-serif text-xl font-semibold mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={shippingInfo.first_name}
                        onChange={handleInputChange}
                        className="mt-1"
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={shippingInfo.last_name}
                        onChange={handleInputChange}
                        className="mt-1"
                        data-testid="input-last-name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="mt-1"
                        data-testid="input-address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="mt-1"
                        data-testid="input-city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="mt-1"
                        data-testid="input-state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip_code">ZIP Code *</Label>
                      <Input
                        id="zip_code"
                        name="zip_code"
                        value={shippingInfo.zip_code}
                        onChange={handleInputChange}
                        className="mt-1"
                        data-testid="input-zip"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div className="animate-fade-in" data-testid="payment-step">
                  <h2 className="font-serif text-xl font-semibold mb-6">Payment Method</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a demo checkout. No real payment will be processed.
                  </p>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" data-testid="payment-card" />
                        <div className="flex-1">
                          <span className="font-medium">Credit / Debit Card</span>
                          <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                        </div>
                        <CreditCard className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                      </label>
                      <label
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'
                        }`}
                      >
                        <RadioGroupItem value="paypal" id="paypal" data-testid="payment-paypal" />
                        <div className="flex-1">
                          <span className="font-medium">PayPal</span>
                          <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label>Card Number</Label>
                        <Input
                          placeholder="4242 4242 4242 4242"
                          className="mt-1"
                          data-testid="input-card-number"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry Date</Label>
                          <Input placeholder="MM/YY" className="mt-1" data-testid="input-card-expiry" />
                        </div>
                        <div>
                          <Label>CVC</Label>
                          <Input placeholder="123" className="mt-1" data-testid="input-card-cvc" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="animate-fade-in" data-testid="review-step">
                  <h2 className="font-serif text-xl font-semibold mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {shippingInfo.first_name} {shippingInfo.last_name}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip_code}<br />
                        {shippingInfo.phone}
                      </p>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-sm text-muted-foreground">
                        {paymentMethod === 'card' ? 'Credit / Debit Card' : 'PayPal'}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {cart.items?.map((item, index) => (
                          <div key={`${item.product_id}-${index}`} className="flex gap-4">
                            <div className="w-16 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Qty: {item.quantity}
                                {item.size && ` | Size: ${item.size}`}
                                {item.color && ` | Color: ${item.color}`}
                              </p>
                            </div>
                            <p className="font-medium text-sm">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 ? (
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="rounded-full"
                    data-testid="back-btn"
                  >
                    Back
                  </Button>
                ) : (
                  <Link to="/cart">
                    <Button variant="outline" className="rounded-full">
                      Back to Cart
                    </Button>
                  </Link>
                )}

                {currentStep < 3 ? (
                  <Button onClick={handleNextStep} className="btn-primary" data-testid="continue-btn">
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="btn-primary"
                    data-testid="place-order-btn"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h2 className="font-serif text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="max-h-48 overflow-y-auto space-y-3 mb-4">
                {cart.items?.map((item, index) => (
                  <div key={`${item.product_id}-${index}`} className="flex gap-3">
                    <div className="w-12 h-14 rounded overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span data-testid="checkout-total">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
