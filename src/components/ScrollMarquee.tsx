'use client'

import { useEffect, useRef } from 'react'
import { ensureGsap, prefersReducedMotion } from '@/lib/motion'

/**
 * Oversized type statement that drifts horizontally — but only while the page is
 * being scrolled, never on an idle timer. An always-running marquee is motion
 * the user did not ask for and cannot stop.
 *
 * Under reduced motion it renders as a static oversized statement, which is the
 * point of the moment anyway.
 */
export function ScrollMarquee({ text, repeat = 3 }: { text: string; repeat?: number }) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return

    const { gsap, ScrollTrigger } = ensureGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: 0 },
        {
          xPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track t-display" ref={track}>
        {Array.from({ length: repeat }, (_, i) => (
          <span className="marquee-item" key={i}>
            {text}
            <span className="marquee-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
