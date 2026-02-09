# HFashion E-Commerce Demo - PRD

## Original Problem Statement
Build an e-commerce demo website called "HFashion" — a modern, stylish fashion retail site with:
1. No real authentication - single demo account always logged in
2. Muted earth tones design (not too minimal or vibrant)
3. Config file for Medallia Digital Feedback and DXA script tags
4. Real fashion stock photos from Unsplash
5. Analytics window variables (`window.hfashion`) tracking all user activity
6. Standard e-commerce features (homepage, product listing, product details, cart, checkout, account pages)
7. Search functionality with autocomplete
8. **Frontend-only architecture** - no backend API calls, all data mocked locally
9. Mobile responsive for flagship phones

## User Personas
- **Demo Users**: Always logged in demo account for showcasing Medallia integration
- **Medallia Stakeholders**: Users evaluating Digital Feedback and DXA capabilities

## Architecture
**Frontend-Only SPA** (React + Vite + Tailwind CSS + Shadcn/UI)
- All data mocked in `/app/frontend/src/data/store.js`
- Cart/Orders/Wishlist persist in localStorage
- No backend server required

## What's Been Implemented

### Frontend Features (100% Complete)
- **Homepage**: Hero section with fashion images, featured products, trending products, category cards, testimonials
- **Product Listing**: Category filtering (Women's, Men's, Accessories, New Arrivals), price range filters, sorting (newest, price asc/desc)
- **Product Detail**: Product images, size selector, color selector, quantity selector, add to cart, **wishlist button**
- **Search Overlay**: Desktop: centered dropdown (max-width, 70% height) | Mobile: full-screen overlay with frosted glass
- **Cart Page**: Dynamic cart with quantity controls, order summary, remove items
- **Checkout Flow**: 3-step wizard (Shipping → Payment → Review), pre-filled demo data
- **Order Confirmation**: Success page with order details and tracking info
- **Account Dashboard**: Profile info (Demo User), order history, **wishlist with items**
- **Order Tracking**: Status timeline, shipping info
- **Wishlist**: Add/remove products, move to cart, persisted in localStorage

### Medallia Integration Ready
- Config file: `/app/frontend/src/config/medallia.js`
- Analytics documentation: `/app/docs/ANALYTICS.md`
- Script placeholders in `public/index.html`

### Window Variables (`window.hfashion`)
- Cart: `cartValue`, `cartItemCount`, `cartItems`, `cartAction`
- Product: `currentProduct`, `productCategory`, `selectedSize`, `selectedColor`
- Checkout: `checkout`, `checkoutStep`, `checkoutValue`, `shippingMethod`, `paymentMethod`
- Order: `orderComplete`, `orderNumber`, `orderTotal`
- Navigation: `currentPage`, `previousPage`, `searchQuery`, `sortBy`, `filterApplied`
- Session: `sessionId`, `userId`, `userName`, `isLoggedIn`
- Engagement: `pageViews`, `productsViewed`, `timeOnSite`, `scrollDepth`
- **Wishlist**: `wishlistCount`, `lastWishlistAction`, `lastWishlistItem`

### Mobile Responsive
- Tested on iPhone viewport (375x812)
- Mobile hamburger menu
- Mobile filter sheet
- 2-column product grid on mobile
- Full-screen search on mobile

## Completed Tasks (February 9, 2026)
- [x] Fixed search overlay with frosted glass effect (createPortal)
- [x] Desktop search: centered dropdown panel (not full-screen)
- [x] Mobile search: full-screen overlay (unchanged)
- [x] Implemented wishlist functionality with localStorage persistence
- [x] Wishlist button shows filled heart when item is saved
- [x] Wishlist page displays saved items with "Add to Cart" and "Remove" buttons
- [x] Updated product images with more relevant fashion photos
- [x] Removed backend directory and api.js (frontend-only)
- [x] Created analytics documentation at `/app/docs/ANALYTICS.md`
- [x] **Updated products to US/UK audience** - Removed kurta, replaced with Oxford shirt, blazers
- [x] **Fixed checkout flow** - Now redirects to Order Confirmation page with full order summary
- [x] **Reduced homepage spacing** - Compact hero section (removed min-height: 80vh)

## Files Structure
```
/app
├── docs/
│   └── ANALYTICS.md          # Window variables documentation
├── frontend/
│   ├── public/
│   │   └── index.html        # Medallia script placeholders
│   └── src/
│       ├── components/
│       │   ├── SearchBar.jsx # Search with desktop dropdown / mobile fullscreen
│       │   └── ProductCard.jsx
│       ├── config/
│       │   └── medallia.js   # Medallia/scripts config
│       ├── context/
│       │   ├── CartContext.js
│       │   └── WishlistContext.js  # NEW: Wishlist state management
│       ├── data/
│       │   └── store.js      # All mock data
│       ├── lib/
│       │   ├── tracking.js   # window.hfashion tracking
│       │   └── utils.js
│       └── pages/
└── memory/
    └── PRD.md
```

## Future Enhancements (Backlog)
- [ ] Product image gallery with multiple views
- [ ] Product reviews/ratings
- [ ] Recently viewed products
- [ ] Related products recommendations
- [ ] Promo codes/discounts

## Notes
- ALL DATA IS MOCKED - No real backend or database
- Demo user is always logged in
- Orders, cart, and wishlist persist in browser localStorage
- Medallia scripts not yet integrated (config ready, user will add tags later)
