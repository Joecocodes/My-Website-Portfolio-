'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ensureGsap, prefersReducedMotion } from '@/lib/motion'

/**
 * Route transition: a solid overlay that covers the viewport and wipes away to
 * reveal the destination.
 *
 * Design decision worth stating plainly: this plays the REVEAL only, on arrival.
 * It deliberately does not intercept link clicks to play an exit animation
 * first. Intercepting navigation means delaying it, which makes the site feel
 * slower, breaks browser back/forward timing, and creates a window where focus
 * is inside a page that is about to be replaced. A reveal-on-arrival gets the
 * same visual result and blocks navigation for exactly zero milliseconds.
 *
 * The overlay is aria-hidden and pointer-events:none throughout, so it is
 * invisible to assistive tech and never intercepts a click.
 */
export function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const el = overlay.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.style.transform = 'translateY(-101%)'
      return
    }

    const { gsap } = ensureGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0 },
        { yPercent: -101, duration: 0.72, ease: 'power4.inOut' }
      )
    }, el)

    return () => ctx.revert()
  }, [pathname])

  return <div ref={overlay} className="page-wipe" aria-hidden="true" />
}
