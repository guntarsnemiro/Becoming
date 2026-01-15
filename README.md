# Becoming

A calm personal growth app for tracking your journey across life areas.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment to Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/Becoming.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose your GitHub repository
   - Configure build settings:
     - **Framework preset**: Next.js (Static HTML Export)
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
     - **Root directory**: `/` (leave as default)
   - Click **Save and Deploy**

3. **Your site will be live** at `https://your-project-name.pages.dev`

### Option 2: Wrangler CLI

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   npm run build
   wrangler pages deploy out
   ```

## Custom Domain

To add a custom domain:
1. Go to your project in Cloudflare Pages
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to add your domain

## Build

```bash
npm run build
```

This creates a static export in the `out` directory, ready for deployment.
