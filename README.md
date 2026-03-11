# Share this HTML via GitHub Pages

This repository is configured to publish the portfolio on **GitHub Pages**.

## 1) Push this repo to GitHub

If your local repo is not connected yet:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## 2) Enable GitHub Pages (one-time)

1. Open your GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The included workflow `.github/workflows/deploy-pages.yml` will deploy automatically on pushes to `main`.

## 3) Share the link

After deployment completes, your portfolio is available at:

```text
https://<your-username>.github.io/<your-repo>/
```

It loads `index.html`, which redirects to `Reevan_Portfolio_Shinkai.html`.
