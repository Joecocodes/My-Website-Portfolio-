'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Motion plumbing shared by every animated component.
 *
 * ScrollTrigger is free under GSAP's standard licence as of 3.13, so no Club
 * membership is required here.
 */

let registered = false

export function ensureGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    // Required when driving ScrollTrigger from Lenis' rAF loop: without this,
    // GSAP's lag smoothing fights the smooth-scroll position and triggers fire
    // at the wrong scroll offsets after a stall.
    gsap.ticker.lagSmoothing(0)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

/** Non-reactive check, for use inside effects and event handlers. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches

export const hasFinePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(FINE_POINTER_QUERY).matches

/**
 * Reactive media-query hook.
 *
 * Starts `false` on the server and on first client render so hydration matches,
 * then resolves in an effect. Every caller must therefore treat `false` as
 * "not yet known" and render the accessible default.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION_QUERY)
export const useFinePointer = () => useMediaQuery(FINE_POINTER_QUERY)

/** House easing and durations, so motion reads as one system. */
export const motionTokens = {
  easeOut: 'expo.out',
  easeInOut: 'power4.inOut',
  revealDuration: 0.95,
  revealStagger: 0.085,
  fadeDuration: 0.7,
} as const
