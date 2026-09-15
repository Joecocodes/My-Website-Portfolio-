import type { Metadata } from 'next'
import { site } from '@/data/site'
import { SectionLabel } from '@/components/SectionLabel'
import { TextReveal, FadeReveal } from '@/components/TextReveal'
import { CopyEmail } from '@/components/CopyEmail'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.name}.`,
}

/**
 * A real route rather than an overlay, deliberately: an overlay-only contact
 * cannot be linked, shared or reached without JavaScript.
 *
 * There is no form. A static export has no server to post to, and a mailto form
 * is worse than a plain address — it silently fails whenever the visitor has no
 * desktop mail client configured. The address is shown, linked and copyable.
 */
export default function ContactPage() {
  return (
    <div className="contact-page shell">
      <TextReveal
        as="h1"
        lines={['Start a', 'conversation.']}
        className="t-display t-statement contact-heading"
        trigger="load"
      />

      <FadeReveal trigger="load" delay={0.3} className="contact-lead">
        <p className="t-read">
          Open to internships, collaborations and the occasional strange idea. The fastest way to
          reach me is email — I read everything, and reply to anything specific.
        </p>
      </FadeReveal>

      <div className="contact-grid">
        <div className="contact-block">
          <SectionLabel>Email</SectionLabel>
          <a href={`mailto:${site.email}`} className="contact-email t-display link-rule" data-cursor="link">
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </div>

        <div className="contact-block">
          <SectionLabel>Elsewhere</SectionLabel>
          <ul className="contact-list">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="link-rule" data-cursor="link">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-block">
          <SectionLabel>Located</SectionLabel>
          <p>{site.location}</p>
          <p className="t-muted">{site.timezone}</p>
        </div>
      </div>
    </div>
  )
}
