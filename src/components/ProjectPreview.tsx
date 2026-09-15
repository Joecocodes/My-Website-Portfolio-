'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/types'
import { asset } from '@/lib/asset'

/**
 * Floating image preview that follows the pointer while a project row is
 * hovered.
 *
 * Performance notes:
 * - ONE preview layer for the whole index, not one per row. Every cover is
 *   mounted once, stacked, and crossfaded by CSS opacity — so switching rows
 *   costs an attribute change, not a mount.
 * - The pointer handler only writes two numbers to a ref. All positioning
 *   happens in a single rAF loop using translate3d, so pointer movement does no
 *   layout work and triggers no React render.
 * - Position is clamped so the artifact never runs off-screen.
 *
 * Rendered only when the parent has confirmed a fine pointer, so it never
 * appears on touch or hybrid-touch devices.
 */
export function ProjectPreview({
  projects,
  activeSlug,
}: {
  projects: Project[]
  activeSlug: string | null
}) {
  const layer = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const primed = useRef(false)

  useEffect(() => {
    const el = layer.current
    if (!el) return

    let frame = 0

    const onMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      const rect = el.getBoundingClientRect()
      const halfW = rect.width / 2 || 180
      const halfH = rect.height / 2 || 220
      const margin = 16

      // Clamp to the viewport so the preview never clips off the edge.
      target.current.x = Math.min(Math.max(event.clientX, halfW + margin), innerWidth - halfW - margin)
      target.current.y = Math.min(Math.max(event.clientY, halfH + margin), innerHeight - halfH - margin)

      if (!primed.current) {
        primed.current = true
        current.current = { ...target.current }
      }
    }

    const tick = () => {
      // Smoothed follow, not pixel-for-pixel snapping.
      current.current.x += (target.current.x - current.current.x) * 0.12
      current.current.y += (target.current.y - current.current.y) * 0.12
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={layer}
      className="preview-layer"
      data-active={activeSlug !== null}
      aria-hidden="true"
    >
      {projects.map((project) => (
        <div
          key={project.slug}
          className="preview-item"
          data-shown={project.slug === activeSlug}
        >
          <Image
            src={asset(project.coverImage.src)}
            alt=""
            fill
            sizes="420px"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}
