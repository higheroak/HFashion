# HFashion E-Commerce Demo

A modern, stylish fashion retail demo website built with React, featuring Medallia Digital Feedback integration capabilities and comprehensive analytics tracking.

![HFashion Demo](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop)

## 🌟 Features

- **Frontend-Only Architecture** - No backend required, perfect for demos
- **Modern E-Commerce UI** - Product listings, cart, checkout, and order tracking
- **Wishlist Functionality** - Save favorite items with localStorage persistence
- **Search with Autocomplete** - Smart search with real-time suggestions
- **Responsive Design** - Mobile-optimized for all devices
- **Analytics Ready** - Comprehensive `window.hfashion` tracking variables
- **Medallia Integration Ready** - Configuration for Digital Feedback and DXA scripts

## 🚀 Quick Start

### Local Development

```bash
cd frontend
yarn install
yarn start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
cd frontend
yarn build
```

## 📦 GitHub Pages Deployment

**This site is fully configured for GitHub Pages!**

See the complete deployment guide: **[GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)**

### Quick Deploy:

1. Push your code to GitHub using the "Save to GitHub" button
2. Enable GitHub Pages in repository settings (Source: GitHub Actions)
3. Your site will auto-deploy on every push!

Or deploy manually:
```bash
cd frontend
yarn deploy
```

## 📁 Project Structure

```
/app
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions auto-deployment
├── frontend/
│   ├── public/
│   │   ├── 404.html            # SPA redirect workaround
│   │   └── index.html          # Main HTML with Medallia placeholders
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── config/
│       │   └── medallia.js     # Medallia configuration
│       ├── context/            # React Context (Cart, Wishlist)
│       ├── data/
│       │   └── store.js        # Mock product data
│       ├── lib/
│       │   ├── tracking.js     # Analytics tracking
│       │   └── utils.js        # Utilities
│       ├── pages/              # Page components
│       └── App.js              # Main app component
├── docs/
│   └── ANALYTICS.md            # Analytics documentation
└── GITHUB_PAGES_DEPLOYMENT.md  # Deployment guide
```

## 🎨 Tech Stack

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Tailwind CSS 3** - Styling
- **shadcn/ui** - UI component library
- **Lucide React** - Icons
- **localStorage** - Data persistence

## 📊 Analytics Tracking

The app tracks comprehensive user behavior via `window.hfashion`:

- Cart operations (add, remove, update)
- Product views and interactions
- Checkout flow progress
- Search queries and filters
- Navigation patterns
- Engagement metrics

See [docs/ANALYTICS.md](./docs/ANALYTICS.md) for complete documentation.

## 🔧 Medallia Integration

Configuration file ready at `/frontend/src/config/medallia.js`

Add your Medallia scripts to:
- `%%MEDALLIA_DIGITAL_FEEDBACK_HEAD%%` in `index.html`
- `%%MEDALLIA_DXA_SCRIPT%%` in `index.html`

## 🛍️ Demo Features

- **Always Logged In** - Demo user account pre-loaded
- **Mock Data** - All products, orders, and user data mocked locally
- **Persistent Cart** - Survives page refreshes
- **Order History** - View past orders
- **Wishlist** - Save items for later
- **Responsive Search** - Desktop dropdown, mobile full-screen

## 📱 Pages

- **Home** - Hero, featured products, categories, testimonials
- **Products** - Grid with filters and sorting
- **Product Detail** - Images, variants, add to cart
- **Cart** - Review items, update quantities
- **Checkout** - 3-step wizard (shipping, payment, review)
- **Order Confirmation** - Success page with tracking
- **Account** - Profile, orders, wishlist
- **Search** - Results with filters

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This is a demo project for showcasing Medallia integration capabilities.

## 🙋 Support

For deployment help, see [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)

---

**Ready to deploy? Follow the [deployment guide](./GITHUB_PAGES_DEPLOYMENT.md) to get your site live on GitHub Pages!** 🚀

