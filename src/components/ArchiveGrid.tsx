'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project, ProjectCategory } from '@/lib/types'
import { Media } from './Media'
import { MediaReveal } from './MediaReveal'

/**
 * Filterable archive grid.
 *
 * Filtering is progressive enhancement: the default state renders every project,
 * so with JS disabled the page is a complete archive rather than an empty shell
 * waiting for a click. The filter buttons are a real radio group so the current
 * selection is announced.
 */
export function ArchiveGrid({
  projects,
  categories,
}: {
  projects: Project[]
  categories: ProjectCategory[]
}) {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <div className="archive-filters" role="radiogroup" aria-label="Filter by discipline">
        <button
          type="button"
          role="radio"
          aria-checked={active === 'all'}
          className="archive-filter t-label"
          onClick={() => setActive('all')}
        >
          All <span aria-hidden="true">({projects.length})</span>
        </button>
        {categories.map((category) => {
          const count = projects.filter((p) => p.category === category).length
          return (
            <button
              key={category}
              type="button"
              role="radio"
              aria-checked={active === category}
              className="archive-filter t-label"
              onClick={() => setActive(category)}
            >
              {category} <span aria-hidden="true">({count})</span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
      </p>

      <ul className="archive-grid">
        {visible.map((project) => (
          <li key={project.slug} className="archive-item">
            <Link href={`/work/${project.slug}`} className="archive-link" data-cursor="view">
              <MediaReveal>
                <Media
                  asset={project.coverImage}
                  sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                />
              </MediaReveal>
              <span className="archive-meta">
                <span className="t-label">{project.number}</span>
                <span className="archive-title t-display">{project.title}</span>
                <span className="t-label">
                  {project.category} / {project.year}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
