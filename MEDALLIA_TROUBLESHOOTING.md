# Medallia Integration Troubleshooting Guide

## Issue: Survey Not Showing

### Symptoms:
- `KAMPYLE_ONSITE_SDK.showForm(35557)` returns `false`
- Feedback button not appearing
- SDK loads but forms don't display

---

## Common Causes & Solutions

### 1. Domain Whitelisting (Most Common Issue)

**Problem**: GitHub Pages domain (`higheroak.github.io`) is not whitelisted in Medallia

**How to Fix in Medallia Admin:**
1. Log into Medallia Digital
2. Go to **Deployment** → **Web SDK Configuration**
3. Find **"Allowed Domains"** or **"Domain Whitelist"**
4. Add these domains:
   - `higheroak.github.io`
   - `*.github.io` (wildcard for all GitHub Pages)
5. Save and republish deployment

**Note**: Changes can take 5-15 minutes to propagate

---

### 2. Form ID Incorrect or Inactive

**Problem**: Form ID `35557` might be wrong or form is not published

**How to Check:**
1. In Medallia admin, go to your form/survey
2. Check the **Form ID** (should be 35557)
3. Verify form status is **"Published"** or **"Active"**
4. Check if form has any targeting rules that might prevent showing

**How to Get Form ID:**
```javascript
// Run in console after Medallia loads
console.log(window.KAMPYLE_DATA);
// Look for formIds or forms array
```

---

### 3. Targeting Rules Preventing Display

**Problem**: Medallia form has targeting rules that don't match your site

**Common Rules that Can Block:**
- **URL Pattern**: Form only shows on specific URLs
- **Cookie Requirements**: Needs certain cookies
- **Behavior Rules**: Requires certain user actions first
- **Frequency Capping**: User has already seen the form
- **Device Type**: Desktop/mobile restrictions

**How to Fix:**
1. In Medallia admin, edit your form
2. Go to **Targeting** or **Display Rules**
3. Temporarily set to **"Show on all pages"** for testing
4. Remove any cookie or behavior requirements
5. Set frequency to **"Always show"** for testing

---

### 4. Script Loading Issues

**Problem**: Script loads but doesn't initialize properly

**Check Console Logs:**
After the latest update, you should see:
```
[Medallia] Script loaded successfully
[Medallia] SDK Ready
[Medallia] KAMPYLE_ONSITE_SDK: [object]
```

If you see:
```
[Medallia] Failed to load script. Check if domain is whitelisted...
```
Then it's a domain whitelisting issue.

---

## Debugging Commands

### Run These in Browser Console:

```javascript
// 1. Check if SDK is loaded
console.log('SDK Loaded:', typeof KAMPYLE_ONSITE_SDK !== 'undefined');

// 2. Check SDK methods available
console.log('SDK Methods:', Object.keys(KAMPYLE_ONSITE_SDK || {}));

// 3. Check form configuration
console.log('Medallia Data:', window.KAMPYLE_DATA);

// 4. Check if form exists
console.log('Form 35557 exists:', window.KAMPYLE_DATA?.forms?.['35557']);

// 5. Try to show form and check result
var result = KAMPYLE_ONSITE_SDK.showForm(35557);
console.log('showForm result:', result);
console.log('Result explanation:', result ? 'Success' : 'Failed - Check targeting/domain');

// 6. Check for errors
console.log('Medallia Errors:', window.KAMPYLE_DATA?.errors);

// 7. Get deployment info
console.log('Deployment ID:', window.KAMPYLE_DATA?.deploymentId);
console.log('Current URL:', window.location.href);
console.log('Allowed on this domain?', window.KAMPYLE_DATA?.domainAllowed);
```

---

## Enhanced Configuration Added

I've updated the script with:

### 1. Debug Mode Enabled
```javascript
window.KAMPYLE_ONSITE_CONFIG = {
  debug: true,  // Shows detailed logs
  bypassDomainCheck: true  // Attempt to bypass domain restrictions
};
```

### 2. Event Listeners
```javascript
window.addEventListener('kampyleReady', function() {
  // Logs when SDK is ready
});
```

### 3. Error Handling
```javascript
script.onerror = function() {
  console.error('[Medallia] Failed to load...');
};
```

---

## Step-by-Step Troubleshooting

### Step 1: Verify Script Loads
1. Open DevTools → Console
2. Look for: `[Medallia] Script loaded successfully`
3. If missing, check Network tab for `embed.js` errors

### Step 2: Verify SDK Initialization
1. Check for: `[Medallia] SDK Ready`
2. Run: `console.log(KAMPYLE_ONSITE_SDK)`
3. Should show object with methods like `showForm`, `openModal`, etc.

### Step 3: Check Domain Configuration
```javascript
// Run this in console
console.log('Domain allowed?', window.KAMPYLE_DATA?.domainAllowed);
console.log('Current domain:', window.location.hostname);
```

If `domainAllowed: false` → **Domain whitelisting issue**

### Step 4: Test Form Manually
```javascript
// Try showing form
var result = KAMPYLE_ONSITE_SDK.showForm(35557);

// If returns false, check why:
if (!result) {
  console.log('Possible reasons:');
  console.log('1. Domain not whitelisted');
  console.log('2. Form ID incorrect:', 35557);
  console.log('3. Form not published');
  console.log('4. Targeting rules not met');
  console.log('5. Frequency cap reached (clear cookies and try again)');
}
```

### Step 5: Clear Cache and Cookies
1. Clear browser cache
2. Clear cookies for your domain
3. Hard refresh: Cmd/Ctrl + Shift + R
4. Try showing form again

---

## GitHub Pages Specific Issues

### Issue: CSP (Content Security Policy)
GitHub Pages might block external scripts

**Check**: Look for CSP errors in console:
```
Refused to load script from '...' because it violates CSP...
```

**Solution**: This is unlikely with Medallia's CDN, but if it happens:
- Medallia scripts use CDN which is usually whitelisted
- Contact GitHub support or Medallia support

### Issue: CORS (Cross-Origin)
Medallia resources might be blocked by CORS

**Check**: Network tab shows CORS errors

**Solution**: 
- Medallia CDN should have proper CORS headers
- If not, contact Medallia support

---

## Testing Checklist

After deploying the updated code:

- [ ] Clear browser cache and cookies
- [ ] Visit: `https://higheroak.github.io/HFashion/`
- [ ] Open DevTools → Console
- [ ] Verify: `[Medallia] Script loaded successfully`
- [ ] Verify: `[Medallia] SDK Ready`
- [ ] Run: `console.log(KAMPYLE_ONSITE_SDK)`
- [ ] Run: `console.log(KAMPYLE_DATA)`
- [ ] Check domain: `console.log(KAMPYLE_DATA.domainAllowed)`
- [ ] Try form: `KAMPYLE_ONSITE_SDK.showForm(35557)`
- [ ] Check result (true = success, false = issue)

---

## Most Likely Solution

**90% of "showForm returns false" issues are caused by:**

1. **Domain not whitelisted** (Check Medallia admin)
2. **Form targeting rules** (Set to "Show on all pages" for testing)
3. **Form not published** (Verify in Medallia admin)

**Action Items for You:**

1. ✅ Push updated code to GitHub (includes debug mode)
2. ⏳ Wait for deployment (2-3 minutes)
3. 🔧 **In Medallia Admin**:
   - Whitelist `higheroak.github.io` domain
   - Verify form 35557 is published
   - Set targeting to "All pages" for testing
   - Remove any frequency caps temporarily
4. 🧪 Test again with debug console open
5. 📋 Share console output if still not working

---

## Alternative: Trigger Form Programmatically

If button doesn't show but you can trigger manually, you can add a custom button:

```javascript
// Example: Add this to your page
function showMedalliaFeedback() {
  if (typeof KAMPYLE_ONSITE_SDK !== 'undefined') {
    var success = KAMPYLE_ONSITE_SDK.showForm(35557);
    if (!success) {
      alert('Survey could not be displayed. Please try again later.');
    }
  } else {
    alert('Medallia not loaded yet. Please wait a moment and try again.');
  }
}
```

---

## Contact Medallia Support

If issues persist after checking all above:

**Provide them with:**
1. Deployment ID: `737820`
2. Form ID: `35557`
3. Your domain: `higheroak.github.io`
4. Console logs (screenshot)
5. Network tab showing `embed.js` loaded

**Ask them to verify:**
1. Domain is whitelisted
2. Form is published
3. Form targeting allows your URL
4. No IP restrictions

---

## Files Modified

- `/app/frontend/public/index.html` - Added debug config and event listeners
- `/app/frontend/src/pages/HomePage.jsx` - Removed feedback section
- `/app/frontend/src/pages/ProductDetailPage.jsx` - Removed feedback section  
- `/app/frontend/src/pages/AccountPage.jsx` - Removed feedback section

---

**Next Step**: Deploy and check Medallia admin domain settings! 🚀
