'use client'

import { site } from '@/data/site'
import { DEMO_CONTENT } from '@/data/projects'
import { getLenis } from '@/lib/lenis-store'
import { TextReveal } from './TextReveal'

export function SiteFooter() {
  const backToTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <footer className="site-footer">
      <div className="shell">
        <hr className="rule" />

        <div className="footer-invite">
          <TextReveal
            as="p"
            lines={['Let’s make', 'something considered.']}
            className="t-display t-statement"
          />
          <a href={`mailto:${site.email}`} className="footer-email link-rule link-arrow" data-cursor="link">
            {site.email} <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="footer-grid grid-editorial">
          <div className="footer-col">
            <span className="t-label">Elsewhere</span>
            <ul>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="link-rule" data-cursor="link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <span className="t-label">Located</span>
            <p>{site.location}</p>
            <p className="t-muted">{site.timezone}</p>
          </div>

          <div className="footer-col">
            <span className="t-label">Status</span>
            <p>{site.status}</p>
          </div>

          <div className="footer-col footer-col-end">
            <button type="button" onClick={backToTop} className="link-rule t-label t-label-ink">
              Back to top ↑
            </button>
          </div>
        </div>

        <hr className="rule" />

        <div className="footer-base">
          <p className="t-label">
            © {new Date().getFullYear()} {site.name}
          </p>
          {DEMO_CONTENT ? (
            <p className="t-label footer-note">
              Case studies shown are fictional placeholder content, built to demonstrate the
              design system.
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
