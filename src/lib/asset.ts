/**
 * Prefixes a /public asset path with the deployment basePath.
 *
 * WHY THIS EXISTS: `next/image` normally adds basePath itself, inside the image
 * loader. A static export forces `images.unoptimized`, which bypasses that
 * loader entirely and passes `src` through verbatim — so on a GitHub *project*
 * page every local image resolves to /media/... instead of
 * /My-Website-Portfolio-/media/... and 404s. Verified by serving the built
 * export under its real subpath; without this helper all 61 media files fail.
 *
 * Every next/image `src` and every hand-written asset URL must go through here.
 */
export const asset = (path: string): string => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '/My-Website-Portfolio-'
  return `${base}/${path.replace(/^\/+/, '')}`
}
