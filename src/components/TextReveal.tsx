'use client'

import { useEffect, useRef, type ElementType } from 'react'
import { ensureGsap, motionTokens, prefersReducedMotion } from '@/lib/motion'

type TextRevealProps = {
  /**
   * Pre-split lines. Splitting is done by the caller as CSS wrappers rather
   * than by measuring and rebuilding the DOM at runtime, which is fragile
   * across font loading and resize.
   */
  lines: string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  /** 'load' animates on mount (hero); 'scroll' waits for the viewport. */
  trigger?: 'load' | 'scroll'
  /** Animate only the first time it enters view. */
  once?: boolean
  delay?: number
}

export function TextReveal({
  lines,
  as: Tag = 'span',
  className,
  lineClassName,
  trigger = 'scroll',
  once = true,
  delay = 0,
}: TextRevealProps) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const targets = el.querySelectorAll<HTMLElement>('.reveal-line')

    // Reduced motion: mark revealed so the CSS pre-state is released, and run
    // no animation at all.
    if (prefersReducedMotion()) {
      targets.forEach((t) => t.setAttribute('data-revealed', 'true'))
      return
    }

    const { gsap, ScrollTrigger } = ensureGsap()

    const ctx = gsap.context(() => {
      /*
       * fromTo with an EXPLICIT start state, not `to` alone.
       *
       * The CSS pre-state is `translateY(110%)`. A percentage translate computes
       * to a pixel matrix, which GSAP reads back as `y: <px>, yPercent: 0`. A
       * plain `gsap.to({ yPercent: 0 })` therefore animates a property that is
       * already 0 and leaves the pixel offset untouched — the line stays parked
       * below its mask, clipped by overflow:hidden, at full opacity. Pinning
       * both `yPercent` and `y` here makes GSAP own the whole transform.
       */
      gsap.fromTo(targets, {
        yPercent: 110,
        y: 0,
        opacity: 0,
      }, {
        yPercent: 0,
        y: 0,
        opacity: 1,
        duration: motionTokens.revealDuration,
        stagger: motionTokens.revealStagger,
        ease: motionTokens.easeOut,
        delay,
        onComplete: () => targets.forEach((t) => t.setAttribute('data-revealed', 'true')),
        ...(trigger === 'scroll'
          ? {
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once,
              },
            }
          : {}),
      })
    }, el)

    // Kills the tween AND its ScrollTrigger, which is the leak this guards.
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [delay, once, trigger, lines])

  return (
    <Tag ref={root} className={className}>
      {lines.map((line, i) => (
        <span className="reveal-mask" key={`${i}-${line}`}>
          <span className={`reveal-line ${lineClassName ?? ''}`}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * Fade-and-rise for small metadata. Same contract as TextReveal: CSS holds the
 * pre-state under html.js only, so no-JS renders finished.
 */
export function FadeReveal({
  children,
  className,
  delay = 0,
  trigger = 'scroll',
  once = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  trigger?: 'load' | 'scroll'
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
      // Explicit start state for the same reason as above.
      gsap.fromTo(el, {
        y: 16,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: motionTokens.fadeDuration,
        ease: motionTokens.easeOut,
        delay,
        onComplete: () => el.setAttribute('data-revealed', 'true'),
        ...(trigger === 'scroll'
          ? { scrollTrigger: { trigger: el, start: 'top 90%', once } }
          : {}),
      })
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [delay, once, trigger])

  return (
    <div ref={root} className={`reveal-fade ${className ?? ''}`}>
      {children}
    </div>
  )
}
