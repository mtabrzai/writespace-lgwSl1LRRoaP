# Deployment Guide

This guide provides instructions for deploying Writespace to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:

- Node.js (v18 or later)
- npm or yarn
- A configured `.env` file with all required environment variables
- A built production version of the application

## Building for Production

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Build the application:
```bash
npm run build
# or
yarn build
```

This will create a production-ready build in the `dist` directory.

## Environment Configuration

Create a `.env` file based on `.env.example` and configure the following variables:

```env
VITE_BASE_URL=https://api.yourdomain.com
VITE_API_KEY=your-api-key
```

## Deployment Options

### Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
# or
yarn global add vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project and deploy.

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
# or
yarn global add netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

3. For production deployment:
```bash
netlify deploy --prod
```

### Static Hosting (AWS S3, GitHub Pages, etc.)

1. Upload the contents of the `dist` directory to your hosting provider.

2. Configure the hosting provider to serve `index.html` for all routes (SPA configuration).

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t writespace .
```

2. Run the container:
```bash
docker run -p 3000:80 -e VITE_BASE_URL=$VITE_BASE_URL -e VITE_API_KEY=$VITE_API_KEY writespace
```

### Node.js Server

For environments requiring a Node.js server:

1. Install `serve`:
```bash
npm install -g serve
# or
yarn global add serve
```

2. Serve the production build:
```bash
serve -s dist
```

## CI/CD Configuration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          VITE_BASE_URL: ${{ secrets.VITE_BASE_URL }}
          VITE_API_KEY: ${{ secrets.VITE_API_KEY }}

      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Environment Variables

Ensure all required environment variables are set in your deployment platform:

- `VITE_BASE_URL`: Your API base URL
- `VITE_API_KEY`: Your API key (if required)

## Post-Deployment Checks

After deployment, verify:

1. The application loads correctly
2. All API requests are successful
3. Authentication flows work as expected
4. All pages are accessible
5. Mobile responsiveness is maintained

## Troubleshooting

### Common Issues

1. **Blank page after deployment**:
   - Ensure your hosting provider is configured for SPAs (all routes should serve `index.html`)
   - Verify the build completed successfully

2. **API requests failing**:
   - Check CORS configuration on your backend
   - Verify `VITE_BASE_URL` is correctly set
   - Ensure the API key is valid and has proper permissions

3. **Environment variables not available**:
   - Verify variables are prefixed with `VITE_` for client-side access
   - Check that variables are properly set in your deployment platform

4. **CSS/JS not loading**:
   - Verify the build completed without errors
   - Check that all static assets are being served correctly
   - Ensure no caching issues (try hard refresh)

### Logs and Debugging

- For Vercel: Check deployment logs in the Vercel dashboard
- For Netlify: Check build logs in the Netlify dashboard
- For Docker: Use `docker logs` to view container logs
- For Node.js server: Check server console output