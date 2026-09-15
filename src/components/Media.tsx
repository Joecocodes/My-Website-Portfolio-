'use client'

import Image from 'next/image'
import type { MediaAsset } from '@/lib/types'
import { asset as assetUrl } from '@/lib/asset'

/**
 * Every image on the site goes through here.
 *
 * The wrapper declares `aspect-ratio` from the asset's own declared ratio, so
 * space is reserved before the file loads and cumulative layout shift stays at
 * zero. next/image handles basePath prefixing and lazy loading; because the
 * export is static, `images.unoptimized` is on and no resizing happens — the
 * placeholder assets are SVG, so they scale losslessly anyway. See README
 * § Replacing images for what changes when real raster photography goes in.
 */
export function Media({
  asset,
  className,
  sizes = '100vw',
  priority = false,
  scale = false,
}: {
  asset: MediaAsset
  className?: string
  sizes?: string
  /** Only the above-the-fold hero should set this. */
  priority?: boolean
  /** Adds a slow scale-in hook for the case-study hero. */
  scale?: boolean
}) {
  return (
    <div
      className={`media-box ${className ?? ''}`}
      style={{ aspectRatio: asset.ratio.replace('/', ' / ') }}
    >
      <Image
        src={assetUrl(asset.src)}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className={scale ? 'media-scale' : undefined}
      />
    </div>
  )
}
