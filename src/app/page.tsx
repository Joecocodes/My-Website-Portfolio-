import Link from 'next/link'
import { projects, workingYears } from '@/data/projects'
import { site } from '@/data/site'
import { HeroIntro } from '@/components/HeroIntro'
import { SectionLabel } from '@/components/SectionLabel'
import { ProjectIndex } from '@/components/ProjectIndex'
import { ScrollMarquee } from '@/components/ScrollMarquee'
import { TextReveal } from '@/components/TextReveal'

/** Name split into display lines by hand — no runtime line measuring. */
const heroLines = site.name.split(' ')

export default function HomePage() {
  return (
    <>
      <HeroIntro nameLines={heroLines} />

      <section className="section" aria-labelledby="selected-work">
        <div className="shell">
          <SectionLabel right={`${workingYears.from}–${workingYears.to}`}>
            <span id="selected-work">Selected work</span>
          </SectionLabel>
        </div>

        <div className="shell">
          <ProjectIndex projects={projects} />
        </div>
      </section>

      <section className="section section-marquee" aria-hidden="true">
        <ScrollMarquee text="Considered by default" />
      </section>

      <section className="section" aria-labelledby="about-teaser">
        <div className="shell">
          <SectionLabel>
            <span id="about-teaser">About</span>
          </SectionLabel>

          <TextReveal
            as="p"
            lines={[
              'I build digital identities and',
              'interfaces for people and ideas',
              'with something to say.',
            ]}
            className="t-display t-statement about-teaser-statement"
          />

          <p className="about-teaser-link">
            <Link href="/about" className="link-rule link-arrow t-label t-label-ink" data-cursor="link">
              More about me <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
