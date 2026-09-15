'use client'

import { useEffect, useRef } from 'react'
import { ensureGsap, prefersReducedMotion } from '@/lib/motion'

/**
 * Clip-path reveal for media entering the viewport.
 *
 * The pre-state lives in CSS under `html.js .reveal-media > *`, so with JS off
 * the media is simply visible. Under reduced motion the clip is released
 * immediately and nothing animates.
 */
export function MediaReveal({
  children,
  className,
  /** Subtle parallax, expressed as a percentage of the element's own height. */
  parallax = 0,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  parallax?: number
  once?: boolean
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.setAttribute('data-revealed', 'true')
      return
    }

    const { gsap, ScrollTrigger } = ensureGsap()

    const ctx = gsap.context(() => {
      gsap.fromTo(el.children, {
        clipPath: 'inset(0 0 100% 0)',
      }, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.15,
        ease: 'power3.out',
        onComplete: () => el.setAttribute('data-revealed', 'true'),
        scrollTrigger: { trigger: el, start: 'top 88%', once },
      })

      // Capped at 10% of element height per the brief; anything more reads as
      // an effect rather than depth.
      if (parallax > 0) {
        gsap.fromTo(
          el.querySelectorAll('img, video'),
          { yPercent: -Math.min(parallax, 10) / 2 },
          {
            yPercent: Math.min(parallax, 10) / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [once, parallax])

  return (
    <div ref={root} className={`reveal-media ${className ?? ''}`}>
      {children}
    </div>
  )
}
