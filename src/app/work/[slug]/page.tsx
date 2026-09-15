import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProject, projects, projectSlugs } from '@/data/projects'
import { ProjectHero } from '@/components/ProjectHero'
import { ProjectGallery } from '@/components/ProjectGallery'
import { NextProject } from '@/components/NextProject'

type Params = { slug: string }

/** Every slug is prerendered at build time — required for a static export. */
export function generateStaticParams(): Params[] {
  return projectSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Not found' }

  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = projects.find((p) => p.slug === project.nextProjectSlug)
  const previous = projects.find((p) => p.slug === project.previousProjectSlug)
  if (!next || !previous) notFound()

  return (
    <article
      className="project-page"
      // Per-project accent, scoped here so it never leaks into global tokens.
      style={{ ['--accent' as string]: project.accentColor }}
    >
      <ProjectHero project={project} />
      <ProjectGallery blocks={project.gallery} />
      <NextProject next={next} previous={previous} />
    </article>
  )
}
