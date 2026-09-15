'use client'

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { site } from '@/data/site'
import { getLenis } from '@/lib/lenis-store'
import { ensureGsap, prefersReducedMotion } from '@/lib/motion'

const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * Full-screen editorial menu overlay.
 *
 * Accessibility contract:
 * - role="dialog" + aria-modal, labelled by its own heading.
 * - Focus moves in on open and returns to the trigger on close.
 * - Tab is trapped inside; Escape closes.
 * - Background scrolling is locked, and Lenis is stopped (overflow:hidden alone
 *   does not stop a smooth-scroll library that is driving the scroll itself).
 * - Rendered but hidden when closed, so it is inert rather than unmounted —
 *   this keeps the open/close animation possible without remount jank.
 */
export function MobileMenu({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean
  onClose: () => void
  returnFocusTo: React.RefObject<HTMLButtonElement | null>
}) {
  const panel = useRef<HTMLDivElement>(null)

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose]
  )

  // Scroll lock + Lenis stop, released on close and on unmount.
  useEffect(() => {
    if (!open) return
    const lenis = getLenis()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    return () => {
      document.body.style.overflow = previousOverflow
      lenis?.start()
    }
  }, [open])

  /**
   * Focus in on open, back to the trigger on close.
   *
   * `wasOpen` guards the restore branch. Without it this effect runs on initial
   * mount with open=false and focuses the Menu button on page load — which is
   * invisible on desktop (the button is display:none there) but on mobile
   * steals focus before the user has pressed anything, making the skip link
   * unreachable and starting keyboard navigation mid-page. Restore focus only
   * on a real open -> closed transition.
   */
  const wasOpen = useRef(false)
  useEffect(() => {
    if (open) {
      const first = panel.current?.querySelector<HTMLElement>(FOCUSABLE)
      first?.focus()
    } else if (wasOpen.current) {
      returnFocusTo.current?.focus()
    }
    wasOpen.current = open
    // returnFocusTo is a ref; excluded deliberately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Staggered link reveal. Skipped wholesale under reduced motion.
  useEffect(() => {
    if (!open || prefersReducedMotion()) return
    const el = panel.current
    if (!el) return

    const { gsap } = ensureGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-menu-item]'),
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out', delay: 0.08 }
      )
    }, el)
    return () => ctx.revert()
  }, [open])

  return (
    <div
      className="menu-overlay on-void"
      data-open={open}
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-heading"
      onKeyDown={onKeyDown}
      ref={panel}
    >
      <h2 id="menu-heading" className="sr-only">
        Site menu
      </h2>

      <div className="menu-top shell">
        <span className="t-label">Index</span>
        <button type="button" className="menu-close t-label t-label-ink" onClick={onClose}>
          Close
        </button>
      </div>

      <nav className="menu-nav shell" aria-label="Main">
        <ul>
          {site.nav.map((item, i) => (
            <li key={item.href}>
              <span className="reveal-mask">
                <Link href={item.href} data-menu-item className="menu-link t-display" onClick={onClose}>
                  <span className="menu-index t-label">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="menu-foot shell">
        <a href={`mailto:${site.email}`} className="link-rule" data-menu-item>
          {site.email}
        </a>
        <ul className="menu-socials">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="link-rule t-label t-label-ink" data-menu-item>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
