import type { Metadata } from 'next'
import { site } from '@/data/site'
import { DEMO_CONTENT } from '@/data/projects'
import { SectionLabel } from '@/components/SectionLabel'
import { TextReveal, FadeReveal } from '@/components/TextReveal'
import { MediaReveal } from '@/components/MediaReveal'
import { Media } from '@/components/Media'

export const metadata: Metadata = {
  title: 'About',
  description: site.statement,
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="shell about-intro">
        <TextReveal
          as="h1"
          lines={['Design that earns', 'its own attention.']}
          className="t-display t-statement about-heading"
          trigger="load"
        />

        <FadeReveal trigger="load" delay={0.35} className="about-status">
          <p className="t-label t-label-ink">{site.role.join(' / ')}</p>
          <p className="t-label">{site.status}</p>
        </FadeReveal>
      </section>

      <MediaReveal className="about-visual">
        <Media
          asset={{
            src: 'media/about-visual.svg',
            alt: 'Abstract editorial composition of layered tonal bands and a single accent rule',
            ratio: '16/9',
          }}
          sizes="100vw"
          priority
        />
      </MediaReveal>

      <section className="shell about-body">
        <div className="about-bio">
          <SectionLabel>Profile</SectionLabel>
          <p className="t-read">
            I am a designer and developer studying at Florida Atlantic University, working across
            identity, interface and the code that carries them. My interest is in systems that stay
            coherent once other people start using them — type scales that survive a real word
            count, grids that hold up at the sixth page rather than only the first.
          </p>
          <p className="t-read">
            I work in the open. Most of what I build ends up as a repository before it ends up as a
            portfolio piece, which suits me: the process is the interesting part.
          </p>
          {DEMO_CONTENT ? (
            <p className="t-read about-disclosure">
              <strong>A note on the work shown:</strong> the case studies on this site are fictional,
              written to demonstrate this design and motion system end to end. They are not client
              engagements. Real project work will replace them as it ships.
            </p>
          ) : null}
        </div>

        <div className="about-side">
          <div className="about-block">
            <SectionLabel>Capabilities</SectionLabel>
            <ul className="about-list">
              {site.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>

          <div className="about-block">
            <SectionLabel right={DEMO_CONTENT ? 'Fictional' : undefined}>
              Selected collaborators
            </SectionLabel>
            <ul className="about-list about-list-muted">
              {site.collaborators.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div className="about-block">
            <SectionLabel>Contact</SectionLabel>
            <ul className="about-list">
              <li>
                <a href={`mailto:${site.email}`} className="link-rule" data-cursor="link">
                  {site.email}
                </a>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="link-rule" data-cursor="link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
