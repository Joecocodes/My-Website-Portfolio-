import type { Project } from '@/lib/types'
import { Media } from './Media'
import { MediaReveal } from './MediaReveal'
import { FadeReveal, TextReveal } from './TextReveal'
import { ProjectMeta } from './ProjectMeta'

/** Case-study header: eyebrow, oversized title, short description, metadata. */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="project-header">
      <div className="shell">
        <FadeReveal trigger="load">
          <p className="t-label">
            {project.number} / {project.year}
          </p>
        </FadeReveal>

        <TextReveal
          as="h1"
          lines={[project.title]}
          className="t-display t-project project-header-title"
          trigger="load"
          delay={0.1}
        />

        <FadeReveal trigger="load" delay={0.3} className="project-header-desc">
          <p className="t-read">{project.description}</p>
        </FadeReveal>

        <div className="project-header-meta">
          <ProjectMeta project={project} />
        </div>
      </div>

      <MediaReveal className="project-hero-media">
        <Media asset={project.heroImage} sizes="100vw" priority scale />
      </MediaReveal>
    </header>
  )
}
