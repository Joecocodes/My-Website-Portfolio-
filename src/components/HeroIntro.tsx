'use client'

import { site } from '@/data/site'
import { FadeReveal, TextReveal } from './TextReveal'

/**
 * Sparse opening statement. Animates on load rather than on scroll, with the
 * metadata following the title.
 */
export function HeroIntro({ nameLines }: { nameLines: string[] }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-inner">
        <h1 id="hero-title" className="sr-only">
          {site.name} — {site.role.join(', ')}
        </h1>

        <TextReveal
          lines={nameLines}
          as="p"
          aria-hidden="true"
          className="t-display t-hero hero-name"
          trigger="load"
        />

        <div className="hero-meta">
          <FadeReveal delay={0.55} trigger="load">
            <p className="t-label t-label-ink">{site.role.join(' / ')}</p>
          </FadeReveal>

          <FadeReveal delay={0.68} trigger="load">
            <p className="t-label hero-status">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </p>
          </FadeReveal>
        </div>

        <FadeReveal delay={0.85} trigger="load" className="hero-cue">
          <span className="t-label" aria-hidden="true">
            Scroll
          </span>
        </FadeReveal>
      </div>
    </section>
  )
}
