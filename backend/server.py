# HFashion - Backend Removed

This backend has been removed. All functionality is now handled in the frontend using localStorage.

The HFashion demo site is a **frontend-only** application for demonstrating Medallia Digital Feedback and DXA integration.

## Data Storage
- Products: Hardcoded in `/frontend/src/data/store.js`
- Cart: localStorage (`hfashion_cart`)
- Orders: localStorage (`hfashion_orders`)
- User: Demo user always logged in

## To restore backend functionality
If you need a real backend in the future, you can:
1. Restore the FastAPI server
2. Connect to MongoDB
3. Update frontend API calls in `/frontend/src/lib/api.js`
