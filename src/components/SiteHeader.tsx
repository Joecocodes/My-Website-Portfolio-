'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/data/site'
import { projects } from '@/data/projects'
import { MobileMenu } from './MobileMenu'

/**
 * Understated sticky header. Transparent at rest; a backdrop only appears once
 * content has scrolled under it, and only for legibility.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  // rAF-throttled so the scroll handler never does work more than once a frame.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="shell site-header-inner">
          <Link href="/" className="wordmark t-label t-label-ink" aria-label={`${site.name} — home`}>
            {site.wordmark}
          </Link>

          <span className="header-index t-label" aria-hidden="true">
            Index / {String(projects.length).padStart(2, '0')}
          </span>

          <nav className="header-nav" aria-label="Main">
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule t-label t-label-ink"
                    data-underlined={isActive(item.href)}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    data-cursor="link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={menuButton}
            type="button"
            className="menu-trigger t-label t-label-ink"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <div id="site-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusTo={menuButton} />
      </div>
    </>
  )
}
