import type { NextConfig } from 'next'

/**
 * This repo deploys to GitHub Pages as a PROJECT page, i.e. it is served from
 * https://<user>.github.io/My-Website-Portfolio-/ rather than the domain root.
 * Every route and asset therefore has to be prefixed, or the deployed site 404s
 * on everything.
 *
 * The prefix is env-driven so the export can also be built and verified at the
 * domain root (NEXT_PUBLIC_BASE_PATH='') during local testing.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/My-Website-Portfolio-'

const nextConfig: NextConfig = {
  // Static HTML export — no Node runtime on GitHub Pages.
  output: 'export',

  basePath,
  assetPrefix: basePath,

  // Emits work/<slug>/index.html instead of work/<slug>.html, which is what
  // GitHub Pages needs in order to serve /work/<slug>/ directly.
  trailingSlash: true,

  // Forced by `output: 'export'`: there is no server to run the optimiser on.
  // Responsive delivery is handled by hand-authored srcset/sizes instead.
  images: { unoptimized: true },

  typescript: { ignoreBuildErrors: false },
}

export default nextConfig
