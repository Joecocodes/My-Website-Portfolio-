'use client'

import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '@/lib/motion'

/**
 * Small trailing cursor dot that becomes a "VIEW" marker over project media.
 *
 * Gated on `(hover: hover) and (pointer: fine)` AND on reduced motion being
 * off, so it never renders for touch, hybrid-touch or reduced-motion users. It
 * is aria-hidden and pointer-events:none: it is decoration layered over the
 * native cursor, and it never replaces a focus indicator.
 *
 * Position is interpolated in a single rAF loop reading from a ref, so pointer
 * movement itself does no layout work and no React state updates per frame.
 */
export function CustomCursor() {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const dot = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const enabled = finePointer && !reducedMotion

  useEffect(() => {
    if (!enabled) return
    const el = dot.current
    if (!el) return

    let frame = 0
    let visible = false

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX
      target.current.y = event.clientY
      if (!visible) {
        visible = true
        current.current = { ...target.current }
        el.setAttribute('data-visible', 'true')
      }

      const interactive = (event.target as HTMLElement | null)?.closest?.('[data-cursor]')
      el.setAttribute('data-state', interactive?.getAttribute('data-cursor') ?? 'default')
    }

    const onLeave = () => {
      visible = false
      el.setAttribute('data-visible', 'false')
    }

    const tick = () => {
      // Lerp toward the pointer so the dot trails rather than snaps.
      current.current.x += (target.current.x - current.current.x) * 0.18
      current.current.y += (target.current.y - current.current.y) * 0.18
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={dot} className="cursor-dot" data-visible="false" data-state="default" aria-hidden="true">
      <span className="cursor-label">View</span>
    </div>
  )
}
