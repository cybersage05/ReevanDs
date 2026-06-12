# Reevan D'Souza Portfolio

A static, GitHub Pages-compatible portfolio for Reevan D'Souza, built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and a minimal React Three Fiber scene.

## Why you may not see the finished site yet

This repository now contains a Vite app. The full animated portfolio is visible only after the app is served by Vite or built into the `dist/` folder. If you open `index.html` directly from the file system or serve the repository root without the GitHub Actions build, you will see the static fallback preview instead of the finished React experience.

## Check locally

```bash
npm install
npm run dev
```

Open the local URL that Vite prints, usually:

```text
http://localhost:5173/
```

## Check the production build

```bash
npm run build
npm run preview
```

`npm run build` generates the deployable static site in `dist/`. `npm run preview` serves that production build locally so you can verify exactly what GitHub Pages will publish.

## Check on GitHub Pages

1. Push to `main`.
2. In GitHub, open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to pass.
5. Open the Pages URL shown in the completed workflow.

The workflow installs dependencies, runs `npm run build`, and uploads the generated `dist/` folder. The Vite config uses `base: './'` so the built output works from GitHub Pages project URLs.
