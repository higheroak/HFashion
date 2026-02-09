# GitHub Pages Deployment Guide

This guide explains how to deploy the HFashion demo site to GitHub Pages.

## 📋 Prerequisites

- A GitHub account
- Your code pushed to a GitHub repository

## 🚀 Deployment Methods

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

This method automatically deploys your site whenever you push to the main branch.

#### Step 1: Push Your Code to GitHub

1. Click the **"Save to GitHub"** button in the Emergent chat interface
2. Follow the prompts to create a new repository or push to an existing one

#### Step 2: Configure GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
4. Save the settings

#### Step 3: Trigger Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your React app
- Deploy to GitHub Pages
- Your site will be live at: `https://<your-username>.github.io/<repo-name>/`

**That's it!** Every push to the main branch will now automatically deploy.

---

### Method 2: Manual Deployment with gh-pages

This method lets you manually deploy from your local machine or Emergent environment.

#### Step 1: Update Repository URL

1. Make sure your code is connected to a GitHub repository
2. Ensure you have push access to the repository

#### Step 2: Update Homepage URL

In `/frontend/package.json`, update the `homepage` field:

```json
{
  "homepage": "https://<your-username>.github.io/<repo-name>/"
}
```

Replace:
- `<your-username>` with your GitHub username
- `<repo-name>` with your repository name

#### Step 3: Deploy

From the `/frontend` directory, run:

```bash
cd /app/frontend
yarn deploy
```

This will:
1. Build the production version (`yarn build`)
2. Push the build to the `gh-pages` branch
3. Your site will be live at the URL you specified in `homepage`

#### Step 4: Configure GitHub Pages (First Time Only)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: Select `gh-pages` and `/root`
4. Click **Save**

Your site will be live in a few minutes!

---

## 🔧 Configuration Details

### Files Modified for GitHub Pages

1. **`/frontend/package.json`**
   - Added `homepage` field (currently set to `"."` for flexibility)
   - Added `gh-pages` package
   - Added `predeploy` and `deploy` scripts

2. **`/frontend/src/App.js`**
   - Updated `BrowserRouter` with `basename={process.env.PUBLIC_URL}`
   - Ensures routing works correctly on GitHub Pages

3. **`/frontend/public/404.html`**
   - Redirect workaround for client-side routing
   - GitHub Pages doesn't support SPAs natively - this fixes deep linking

4. **`/frontend/public/index.html`**
   - Added SPA redirect script
   - Works with 404.html to enable proper routing

5. **`.github/workflows/deploy.yml`**
   - GitHub Actions workflow for automatic deployment
   - Builds and deploys on every push to main

---

## 🌐 Accessing Your Site

### Project Site (Most Common)
- URL: `https://<username>.github.io/<repository-name>/`
- Example: `https://johndoe.github.io/hfashion-demo/`

### User/Organization Site
- URL: `https://<username>.github.io/`
- Requires repository named exactly: `<username>.github.io`

---

## 🧪 Testing Locally Before Deployment

To test the production build locally:

```bash
cd /app/frontend

# Build the production version
yarn build

# Serve it locally (requires serve package)
npx serve -s build
```

---

## 🐛 Troubleshooting

### Blank Page After Deployment

**Problem**: Site loads but shows a blank page

**Solution**: Check if your `homepage` URL is correct in `package.json`

1. If using a project site: `"homepage": "https://<username>.github.io/<repo-name>/"`
2. If using a user site: `"homepage": "https://<username>.github.io/"`

### 404 Errors on Page Refresh

**Problem**: Direct links or page refreshes show 404 errors

**Solution**: This is already fixed! The `404.html` redirect workaround handles this.

### Assets Not Loading (404 on CSS/JS)

**Problem**: HTML loads but CSS/JS files show 404

**Solution**: 
1. Verify `PUBLIC_URL` is set correctly
2. Check that `basename` is used in `BrowserRouter`
3. Ensure `homepage` in `package.json` matches your GitHub Pages URL

### GitHub Actions Deployment Fails

**Problem**: Actions workflow shows errors

**Solution**:
1. Check that GitHub Pages is enabled in repository settings
2. Ensure **Source** is set to "GitHub Actions"
3. Verify the workflow file is in `.github/workflows/`
4. Check the Actions tab for specific error messages

---

## 📝 Notes

- **No Backend Required**: This is a frontend-only demo site
- **All Data is Mocked**: No database or API calls
- **localStorage Persistence**: Cart, orders, and wishlist persist in browser
- **Free Hosting**: GitHub Pages is completely free for public repositories

---

## 🔄 Updating Your Deployed Site

### With GitHub Actions (Automatic)
Simply push your changes to the main branch:
```bash
git add .
git commit -m "Update site"
git push origin main
```

### With Manual Deployment
Run the deploy command:
```bash
cd /app/frontend
yarn deploy
```

---

## 🎯 Next Steps After Deployment

1. **Verify Deployment**: Visit your GitHub Pages URL
2. **Test All Routes**: Navigate through the site to ensure routing works
3. **Mobile Testing**: Test on different devices
4. **Share**: Your demo site is now live and shareable!

---

## 📧 Need Help?

- GitHub Pages Documentation: https://docs.github.com/en/pages
- React Router on GitHub Pages: https://create-react-app.dev/docs/deployment/#github-pages
- GitHub Actions: https://docs.github.com/en/actions

---

**Your HFashion demo site is ready for GitHub Pages! 🎉**
