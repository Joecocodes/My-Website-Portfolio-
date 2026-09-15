'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { ensureGsap, prefersReducedMotion } from '@/lib/motion'
import { setLenis } from '@/lib/lenis-store'

/**
 * Smooth scrolling, synchronised with ScrollTrigger.
 *
 * Accessibility decisions worth being explicit about:
 *
 * 1. Under `prefers-reduced-motion` Lenis is NOT instantiated at all. Merely
 *    shortening its duration still hijacks the scroll — a reduced lerp is a
 *    lerp. The browser's native scrolling is the correct reduced-motion
 *    behaviour, so we hand it back entirely.
 * 2. Lenis intercepts scrolling, which breaks native in-page anchor jumps. The
 *    delegated click handler below routes same-page anchors through
 *    `lenis.scrollTo` and keeps the URL hash updated so links stay shareable.
 * 3. Scroll position is reset on route change and ScrollTrigger is refreshed,
 *    because a static export mounts a fresh tree without resetting Lenis.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const { gsap, ScrollTrigger } = ensureGsap()

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never smooth touch scrolling: it fights the platform's own physics and
      // is the single most complained-about part of sites like this.
      syncTouch: false,
    })

    setLenis(lenis)

    const onLenisScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onLenisScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)

    // Same-page anchors, routed through Lenis so they animate once, not twice.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -24 })
      history.pushState(null, '', id)
      // Keep keyboard focus with the destination, not the link we came from.
      ;(target as HTMLElement).setAttribute('tabindex', '-1')
      ;(target as HTMLElement).focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      lenis.off('scroll', onLenisScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // Route changes: top of page, then re-measure every trigger.
  useEffect(() => {
    const { ScrollTrigger } = ensureGsap()
    window.scrollTo(0, 0)
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  return <>{children}</>
}
