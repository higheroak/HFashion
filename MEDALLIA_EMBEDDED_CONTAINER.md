# Medallia Embedded Feedback Container - Order Tracking Pages

## Overview

Added an empty container div for Medallia embedded surveys on order tracking pages (`/account/orders/order-***`).

This prepares the pages for Medallia's embedded feedback functionality, where surveys can be displayed inline within the page content rather than as overlays.

---

## Implementation

### Modified: `/app/frontend/src/pages/OrderTrackingPage.jsx`

**Added before closing `</div>` of main container:**

```jsx
{/* Medallia Embedded Feedback Container */}
<div id="medallia_embedded_feedback" className="w-full mt-8 md:mt-12"></div>
```

---

## Specifications

### ✅ **Element Details**

**Tag:** `<div>`  
**ID:** `medallia_embedded_feedback`  
**Classes:** `w-full mt-8 md:mt-12`

**Styling:**
- `w-full` - Full width (100%)
- `mt-8` - Top margin 2rem (mobile)
- `md:mt-12` - Top margin 3rem (desktop)

### ✅ **Positioning**

**Location in DOM:**
```html
<main>
  <div className="container">
    <!-- Order tracking content -->
    
    <!-- Actions (Back to Orders, Continue Shopping) -->
    
    <!-- Medallia Container (LAST ELEMENT) -->
    <div id="medallia_embedded_feedback" className="w-full mt-8 md:mt-12"></div>
  </div>
</main>

<Footer />
```

**Visual Position:**
```
┌─────────────────────────────────┐
│  Order Status Timeline          │
│  Order Items                    │
│  Order Summary                  │
│  Shipping Information           │
│  Actions (Buttons)              │
│                                 │
│  ┌───────────────────────────┐ │
│  │ medallia_embedded_feedback│ │  ← NEW (Full Width)
│  │        (empty)             │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
──────────────────────────────────
Footer
```

---

## How Medallia Uses This

### Embedded Survey Injection

Medallia will inject survey content into this div:

```javascript
// Medallia SDK will do something like:
document.getElementById('medallia_embedded_feedback').innerHTML = `
  <div class="medallia-survey">
    <!-- Survey questions and UI -->
  </div>
`;
```

### Types of Embedded Surveys

**1. Post-Purchase Feedback**
- "How was your order experience?"
- "Would you recommend us?"
- Rating questions

**2. Order Tracking Feedback**
- "Did you find what you needed?"
- "Was tracking information helpful?"
- Delivery expectations

**3. Issue Reporting**
- "Any problems with your order?"
- "Need assistance?"
- Support routing

---

## Why Order Tracking Pages?

### Perfect Context for Feedback:

**✅ Customer Engagement:**
- Customer actively checking order
- Invested in their purchase
- Timely feedback opportunity

**✅ Order Journey:**
- Post-purchase phase
- Delivery expectations setting
- Support needs identification

**✅ High Response Rate:**
- Customers return multiple times
- Natural touchpoint
- Relevant context

---

## Styling Details

### Width: 100%
```css
.w-full {
  width: 100%;
}
```

**Why full width:**
- ✅ Matches page container
- ✅ Survey has full horizontal space
- ✅ Professional appearance
- ✅ Responsive by default

### Margins: Responsive
```css
.mt-8 {
  margin-top: 2rem; /* 32px */
}

@media (min-width: 768px) {
  .md\:mt-12 {
    margin-top: 3rem; /* 48px */
  }
}
```

**Why spacing:**
- ✅ Separates from action buttons
- ✅ Visual breathing room
- ✅ Clear section distinction
- ✅ More space on desktop

---

## Medalllia Configuration

### In Medallia Admin:

**1. Create Embedded Form**
- Type: **Embedded**
- Target: `#medallia_embedded_feedback`
- Pages: `/account/orders/order-*`

**2. Targeting Rules**
- URL pattern: `higheroak.github.io/HFashion/account/orders/`
- Trigger: Page load
- Frequency: Once per order

**3. Design**
- Style: Inline (not modal)
- Width: 100% (container width)
- Theme: Match site colors

**4. Questions**
Example questions for order tracking:
- "How satisfied are you with your order?"
- "Was the tracking information helpful?"
- "Do you have any concerns about your order?"
- "Would you like to be contacted about your order?"

---

## Pages Affected

The container appears on these URLs:

```
https://higheroak.github.io/HFashion/account/orders/order-001
https://higheroak.github.io/HFashion/account/orders/order-002
https://higheroak.github.io/HFashion/account/orders/order-003
...
```

**Pattern:** `/account/orders/order-***`

---

## Build Status

✅ Build successful (12.12s)  
✅ Bundle: 156.44 kB (+34 B)  
✅ CSS: 13.87 kB (+5 B)  
✅ No errors or warnings

**Size impact:** +39 bytes total (negligible)

---

## Testing Checklist

### Visual Verification:
- [ ] Navigate to `/account/orders`
- [ ] Click on any order
- [ ] Scroll to bottom of order tracking page
- [ ] See space after action buttons (before footer)
- [ ] **Verify:** Empty space reserved for survey

### DOM Inspection:
- [ ] Open DevTools → Elements
- [ ] Find `<div id="medallia_embedded_feedback">`
- [ ] **Verify:** ID is correct
- [ ] **Verify:** Class `w-full` applied
- [ ] **Verify:** Margins applied
- [ ] **Verify:** Inside `<main>` tag
- [ ] **Verify:** Before `<footer>`

### Medallia Integration (After Configuration):
- [ ] Medallia injects survey into div
- [ ] Survey appears inline (not overlay)
- [ ] Full width display
- [ ] Proper spacing maintained
- [ ] Responsive on mobile

---

## CSS Classes Applied

### Tailwind Classes:

**`w-full`**
- Width: 100%
- Full container width

**`mt-8`**
- Margin-top: 2rem (32px)
- Mobile spacing

**`md:mt-12`**
- Margin-top: 3rem (48px) at md breakpoint (768px+)
- Desktop spacing

---

## Empty State Behavior

**Before Medallia Injection:**
- Div exists but empty
- Takes up no vertical space (empty div collapses)
- No visual impact on page

**After Medallia Injection:**
- Div filled with survey content
- Expands to fit content
- Full width maintained
- Spacing preserved

---

## Alternative Locations Considered

### ❌ Modal Overlay
- Would cover content
- Not inline/embedded

### ❌ Before Actions
- Interrupts user flow
- Less natural placement

### ❌ Sidebar
- Not full width
- Limited space

### ✅ After Actions (Current)
- Natural end of page content
- Full width available
- Doesn't interrupt flow
- Above footer (clear separation)

---

## Advantages of This Placement

**1. Non-Intrusive:**
- Below main content
- Doesn't block information
- Optional engagement

**2. Contextual:**
- After reviewing order details
- After using tracking features
- Perfect timing for feedback

**3. Professional:**
- Clean separation
- Full width design
- Proper spacing

**4. Flexible:**
- Accommodates any survey length
- Responsive
- Easy to style

---

## File Modified

**Single file:**
- `/app/frontend/src/pages/OrderTrackingPage.jsx` (Line 257)

**Changes:**
- Added 2 lines (comment + div)
- +39 bytes to bundle

---

## Future Enhancements

### Option 1: Multiple Containers
Add to other pages:
```jsx
// Cart page
<div id="medallia_embedded_cart"></div>

// Checkout page
<div id="medallia_embedded_checkout"></div>
```

### Option 2: Dynamic ID
```jsx
<div id={`medallia_embedded_${orderId}`}></div>
```

### Option 3: Loading Indicator
```jsx
<div id="medallia_embedded_feedback" className="w-full mt-8 md:mt-12">
  {/* Optional: Show loading state */}
  <div className="text-center text-muted-foreground text-sm">
    Loading feedback form...
  </div>
</div>
```

---

## Documentation for Medallia Team

**Container Details:**
- **Element ID:** `medallia_embedded_feedback`
- **Location:** Order tracking pages
- **URL Pattern:** `/account/orders/order-*`
- **Width:** 100% (responsive)
- **Position:** Last element in `<main>`, before `<footer>`

**Recommended Survey Type:**
- Embedded (inline)
- Target: `#medallia_embedded_feedback`
- Trigger: Page load
- Style: Match site theme

---

## Status

✅ **Container added**  
✅ **Full width (100%)**  
✅ **Proper positioning (last in main)**  
✅ **Responsive spacing**  
✅ **Ready for Medallia injection**

---

**Order tracking pages are now ready for Medallia embedded surveys!** 🎉

The container provides a clean, professional space for inline feedback collection on every order tracking page.
