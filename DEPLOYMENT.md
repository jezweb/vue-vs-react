# GitHub Pages Deployment Guide

This guide explains how to deploy the Vue vs React comparison website to GitHub Pages.

## Automatic Deployment

The project is configured for automatic deployment to GitHub Pages whenever you push to the `main` branch.

### Prerequisites

1. Ensure your repository is pushed to GitHub at https://github.com/jezweb/vue-vs-react
2. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

### How It Works

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
   - Triggers on every push to the `main` branch
   - Builds the project using Node.js 20
   - Deploys the `dist` folder to GitHub Pages

2. **Vite Configuration** (`vite.config.js`):
   - Sets the base path to `/vue-vs-react/` for GitHub Pages
   - Configures production build settings
   - Optimizes Monaco Editor chunks

3. **SPA Routing Support**:
   - `public/404.html` handles client-side routing
   - Redirects all routes to the main app for Vue Router to handle

## Manual Deployment

If you need to deploy manually:

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Build and deploy
npm run deploy
```

## Deployment URLs

- **Production**: https://jezweb.github.io/vue-vs-react/
- **Repository**: https://github.com/jezweb/vue-vs-react

## Build Configuration

The build process:
1. Compiles Vue components
2. Bundles all JavaScript and CSS
3. Optimizes assets for production
4. Generates a `dist` folder with the static files

### Important Files

- **vite.config.js**: Contains the base path and build settings
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automated deployment
- **public/404.html**: Handles SPA routing on GitHub Pages
- **index.html**: Main HTML file with SPA redirect script

## Troubleshooting

### Assets Not Loading

If assets aren't loading correctly:
1. Ensure the `base` in `vite.config.js` matches your repository name
2. Check that all asset imports use relative paths

### Routing Issues

If routes return 404:
1. Verify the `404.html` file exists in the `public` folder
2. Check that the SPA redirect script is in both `index.html` and `404.html`

### Build Failures

If the build fails:
1. Check GitHub Actions logs for specific errors
2. Ensure all dependencies are listed in `package.json`
3. Test the build locally with `npm run build`

## Local Testing

To test the production build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Note: The preview command will serve the site at the configured base path.