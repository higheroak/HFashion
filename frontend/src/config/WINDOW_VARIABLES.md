# HFashion Window Variables Documentation

This document lists all JavaScript window variables that are created and updated based on user activity. These variables can be used for Medallia DXA integration and custom analytics.

## Global Tracking Object

All tracking data is stored in `window.hfashion` object.

---

## Cart Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.cartValue` | number | Current total value of items in cart | `149.99` |
| `window.hfashion.cartItemCount` | number | Total number of items in cart | `3` |
| `window.hfashion.cartItems` | array | Array of cart item objects | `[{id, name, price, qty}]` |
| `window.hfashion.cartLastUpdated` | string | ISO timestamp of last cart update | `"2025-01-10T..."` |
| `window.hfashion.cartAction` | string | Last cart action performed | `"add"`, `"remove"`, `"update"`, `"clear"` |

---

## Product Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.currentProduct` | object | Currently viewed product details | `{id, name, price, category}` |
| `window.hfashion.productCategory` | string | Category of current product | `"women"` |
| `window.hfashion.productPrice` | number | Price of current product | `89.00` |
| `window.hfashion.productViewTime` | string | Time when product was viewed | `"2025-01-10T..."` |
| `window.hfashion.selectedSize` | string | Selected product size | `"M"` |
| `window.hfashion.selectedColor` | string | Selected product color | `"Cream"` |

---

## Checkout Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.checkout` | string | Checkout status | `"started"`, `"shipping"`, `"review"`, `"complete"` |
| `window.hfashion.checkoutStep` | number | Current checkout step (1-4) | `2` |
| `window.hfashion.checkoutValue` | number | Total checkout value | `189.99` |
| `window.hfashion.shippingMethod` | string | Selected shipping method | `"standard"`, `"express"` |
| `window.hfashion.paymentMethod` | string | Selected payment method | `"card"`, `"paypal"` |

---

## Order Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.orderComplete` | boolean | Whether order was completed | `true` |
| `window.hfashion.orderNumber` | string | Order number if completed | `"HF-A1B2C3D4"` |
| `window.hfashion.orderTotal` | number | Final order total | `199.98` |
| `window.hfashion.orderItemCount` | number | Number of items in order | `2` |
| `window.hfashion.orderDate` | string | Order placement date | `"2025-01-10T..."` |

---

## Navigation Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.currentPage` | string | Current page name | `"home"`, `"products"`, `"cart"`, `"checkout"` |
| `window.hfashion.previousPage` | string | Previous page visited | `"home"` |
| `window.hfashion.pageCategory` | string | Category filter if on products page | `"men"` |
| `window.hfashion.searchQuery` | string | Current search query | `"dress"` |
| `window.hfashion.sortBy` | string | Current sort option | `"price_asc"` |
| `window.hfashion.filterApplied` | object | Applied filters | `{category: "women", priceRange: "50-100"}` |

---

## User Session Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.sessionId` | string | Unique session identifier | `"sess_abc123"` |
| `window.hfashion.sessionStart` | string | Session start time | `"2025-01-10T..."` |
| `window.hfashion.isLoggedIn` | boolean | User login status (always true for demo) | `true` |
| `window.hfashion.userId` | string | Demo user ID | `"demo-user-001"` |
| `window.hfashion.userName` | string | Demo user name | `"Demo User"` |

---

## Engagement Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.pageViews` | number | Total page views in session | `5` |
| `window.hfashion.productsViewed` | array | List of viewed product IDs | `["prod1", "prod2"]` |
| `window.hfashion.timeOnSite` | number | Seconds spent on site | `120` |
| `window.hfashion.scrollDepth` | number | Max scroll depth percentage | `75` |
| `window.hfashion.lastInteraction` | string | Timestamp of last interaction | `"2025-01-10T..."` |

---

## Event Tracking

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `window.hfashion.lastEvent` | object | Last tracked event details | `{name: "add_to_cart", data: {...}}` |
| `window.hfashion.eventHistory` | array | Array of recent events | `[{name, data, timestamp}]` |

---

## Usage Example

```javascript
// Check cart value
console.log(window.hfashion.cartValue); // 149.99

// Check checkout status
if (window.hfashion.checkout === 'complete') {
  // Order completed
  console.log('Order:', window.hfashion.orderNumber);
}

// Track custom event
window.hfashion.lastEvent = {
  name: 'custom_event',
  data: { key: 'value' },
  timestamp: new Date().toISOString()
};
```

---

## Medallia Integration

These variables are automatically available for Medallia DXA to capture. For Digital Feedback surveys, you can use these variables as conditions for triggering surveys:

1. Trigger survey when `window.hfashion.checkout === 'complete'`
2. Trigger survey when `window.hfashion.cartValue > 100`
3. Trigger survey when `window.hfashion.pageViews >= 5`

---

## Notes

- All variables are updated in real-time as user interacts with the site
- Variables persist for the duration of the browser session
- For Medallia DXA, ensure your DXA script loads after these variables are initialized
- Use `window.hfashion` namespace to avoid conflicts with other scripts
