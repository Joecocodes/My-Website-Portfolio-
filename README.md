# Joeco Tabernilla — Portfolio

An editorial portfolio site: Next.js 16 (App Router) + TypeScript, Tailwind v4,
GSAP/ScrollTrigger and Lenis, deployed as a static export to GitHub Pages.

**Live:** https://joecocodes.github.io/My-Website-Portfolio-/

> **The case studies are fictional.** The ten projects in `src/data/projects.ts`
> are placeholder content written to exercise the design and motion system —
> they are not real client engagements. This is disclosed on the site itself (in
> the footer and on `/about`) and is controlled by the `DEMO_CONTENT` flag. See
> [Replacing the demo content](#replacing-the-demo-content).

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000/My-Website-Portfolio-
npm run build      # static export -> out/
npm run typecheck  # tsc --noEmit
```

Node 22 or newer.

Note the dev URL: `basePath` is always applied, so the site lives under
`/My-Website-Portfolio-` locally too. That is deliberate — it means path bugs
show up in development instead of only in production.

To build for the domain root instead (a custom domain, or Vercel):

```bash
NEXT_PUBLIC_BASE_PATH= npm run build
```

### Previewing the real export

`next dev` does not exercise the static export. To check what actually ships:

```bash
npm run build
npm run serve:export   # serves out/ on :4173
```

---

## Deployment

`.github/workflows/deploy.yml` builds and publishes `out/` to GitHub Pages on
every push to `main`. Enable it once under **Settings → Pages → Source →
GitHub Actions**.

Two things that must not be removed:

- **`public/.nojekyll`** — without it, Pages runs the output through Jekyll,
  which strips the `_next/` directory and breaks every script and stylesheet.
- **`basePath` / `assetPrefix` in `next.config.ts`** — this is a *project* page,
  not a user page, so everything is served from a subpath.

---

## Where the content lives

| What | File |
|---|---|
| Your name, role, status, email, socials, nav, capabilities | `src/data/site.ts` |
| The ten projects and all case-study copy | `src/data/projects.ts` |
| Content types | `src/lib/types.ts` |

### Adding or editing a project

Edit the `seeds` array in `src/data/projects.ts`. Everything else follows
automatically:

- routes (`generateStaticParams` reads the slug list),
- previous/next links (derived from array order and wrapped, so they can never
  fall out of sync),
- the archive grid and its category filters,
- the project count in the header and the year range in the section label.

A case study's body is `gallery`, a list of narrative blocks:

| `kind` | Renders |
|---|---|
| `full` | One full-bleed image, optional caption |
| `pair` | Two images side by side (stacked below 768px) |
| `text` | Optional heading plus paragraphs in a narrow reading column |
| `quote` | Oversized pull quote with optional attribution |

### Replacing the demo content

1. Replace the entries in `seeds` with real projects.
2. Set `DEMO_CONTENT = false` in `src/data/projects.ts`. This removes the
   disclosure note from the footer, the paragraph on `/about`, and the
   "Fictional" marker on the collaborators list.
3. Update `collaborators` in `src/data/site.ts` — those names match the demo
   projects.

---

## Replacing images

Placeholder art lives in `public/media/<slug>/` and is **generated**, not drawn
by hand:

```bash
node scripts/generate-placeholders.mjs
```

The script reads slugs, accent colours and aspect ratios straight out of
`src/data/projects.ts`, so ratios cannot drift between the data and the files.
Output is deterministic — the same slug always produces the same composition.

To use real images instead:

1. Drop files into `public/media/<slug>/`.
2. Point the `src` in `projects.ts` at them (paths are relative to `public/`,
   no leading slash) and set `ratio` to the file's true aspect ratio. The ratio
   drives the `aspect-ratio` wrapper that keeps layout shift at zero, so an
   inaccurate value will make the page jump on load.
3. Write real `alt` text. Use `alt: ''` only for genuinely decorative images.
4. Delete the corresponding entry from the generator, or stop running it.

**One caveat about optimisation.** `output: 'export'` forces
`images.unoptimized`, so `next/image` does no resizing — files are served at
their original bytes. That is fine for the SVG placeholders, which scale
losslessly. If you add raster photography, either pre-generate width variants
and hand-author `srcset`, or move to a host that runs the Next image optimiser.

---

## How the animation utilities work

Everything animated obeys one rule: **CSS owns the finished state, and the
pre-animation state only exists under `html.js`.**

An inline script in `<head>` (`src/app/layout.tsx`) stamps `js` on `<html>`
before first paint. Every hidden-before-reveal rule in `globals.css` is scoped
to `html.js`. So with JavaScript disabled the class never lands and every page
renders complete and readable — no blank hero, no flash.

| Component | Use |
|---|---|
| `TextReveal` | Line-masked reveal. Takes pre-split `lines` — nothing measures or rebuilds the DOM at runtime. `trigger="load"` for above the fold, `"scroll"` otherwise. |
| `FadeReveal` | Small fade-and-rise for metadata. |
| `MediaReveal` | Clip-path reveal on enter, with optional `parallax` (capped at 10%). |
| `ScrollMarquee` | Horizontal drift driven by scroll position only — never on a timer. |

Each one creates a `gsap.context()` and calls `ctx.revert()` on unmount, which
kills the tween and its ScrollTrigger together.

> **If you write a new reveal, pin the start state explicitly with `fromTo`.**
> A percentage CSS transform like `translateY(110%)` computes to a *pixel*
> matrix, which GSAP reads back as `y: <px>, yPercent: 0`. A bare
> `gsap.to({ yPercent: 0 })` then animates a property that is already zero and
> silently leaves the element parked outside its `overflow: hidden` mask —
> invisible, at full opacity. This bug shipped once and was caught by the
> geometry assertion in the verification pass.

### Reduced motion

`prefers-reduced-motion: reduce` is handled twice over, deliberately:

- **In JS** — each component checks and skips its animation, releasing the
  pre-state immediately.
- **In CSS** — a media block forces `transform: none` and `opacity: 1`. Even if
  the JS branch regressed, content stays visible.

---

## Tuning smooth scroll and the cursor

### Smooth scrolling (Lenis)

`src/components/SmoothScrollProvider.tsx`.

- **Disable entirely:** remove `<SmoothScrollProvider>` from
  `src/app/layout.tsx`. Nothing else depends on it; native scrolling takes over.
- **Tune the feel:** `duration` (default `1.05`) and `easing`.
- Under reduced motion Lenis is **never instantiated** — not merely slowed. A
  shortened lerp is still hijacked scrolling, so the browser's own behaviour is
  handed back completely.
- Touch scrolling is never smoothed (`syncTouch: false`); it fights platform
  physics.
- `gsap.ticker.lagSmoothing(0)` plus `lenis.on('scroll', ScrollTrigger.update)`
  keeps ScrollTrigger in step. Removing either makes triggers fire at the wrong
  offsets after a stall.
- Same-page anchors are routed through `lenis.scrollTo` so they animate once
  rather than twice, and focus follows the destination.

### Custom cursor

`src/components/CustomCursor.tsx`.

- **Disable:** remove `<CustomCursor />` from `src/app/layout.tsx`.
- It only renders when `(hover: hover) and (pointer: fine)` matches **and**
  motion is not reduced, so touch and hybrid devices never get it. CSS enforces
  the same rule again as a backstop.
- Trail speed is the `0.18` lerp factor in the rAF loop.
- Set a hover state on any element with `data-cursor="view"` or
  `data-cursor="link"`.
- It is `aria-hidden`, `pointer-events: none`, and the native cursor stays
  visible underneath. It never replaces a focus indicator.

### Hover preview

`src/components/ProjectPreview.tsx`. One shared layer for the whole index — all
covers mount once and crossfade, so switching rows costs an attribute change
rather than a mount. Pointer movement writes two numbers to a ref; a single rAF
loop does the positioning with `translate3d`. Follow speed is the `0.12` lerp
factor; size is the `clamp()` on `.preview-layer`.

---

## Verified behaviour

Checked against the built export served under its real subpath, in Chromium:

- Build and `tsc --noEmit` clean; all 16 routes prerender and return 200.
- Zero console errors/warnings and zero failing requests, desktop and mobile.
- Skip link is the first tab stop; menu traps focus, closes on Escape, restores
  focus to its trigger, and releases the scroll lock.
- Reduced motion: all reveals visible, Lenis not instantiated, cursor absent.
- JavaScript disabled: every sampled route renders complete, visible content.
- Touch devices: no hover preview, no custom cursor, static thumbnails instead;
  all sampled touch targets ≥ 44px.
- Layout shift from media: 0.0000.
- Reveals verified by *geometry*, not just opacity — a line at `opacity: 1` that
  is still parked outside its mask counts as a failure.
- Homepage at 20 projects: 16.7ms median frame, zero frames over 50ms, while
  scrolling and while sweeping the hover preview.

---

## Project structure

```
src/
  app/            routes, layout, globals.css, icon.svg
  components/     UI + motion components
  data/           site.ts (identity), projects.ts (content)
  lib/            types, motion helpers, asset(), lenis handle
public/media/     generated placeholder art
scripts/          placeholder generator
legacy/           the previous static site, kept for reference
```

`legacy/` is the original hand-written site. It is not built or served — it is
there so nothing was lost in the rewrite, and can be deleted whenever you like.
