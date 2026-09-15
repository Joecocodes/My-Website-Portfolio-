'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/types'
import { asset } from '@/lib/asset'

/**
 * One editorial index entry.
 *
 * The whole row is a single link, so there is exactly one tab stop per project
 * and the touch target is the full row height (comfortably over 44px).
 *
 * The thumbnail is in the markup at every breakpoint and hidden by CSS above the
 * large breakpoint, where the pointer-follow preview takes over. Doing it in CSS
 * rather than by feature-detecting in JS is what makes the mobile experience
 * independent of JavaScript entirely.
 */
export function ProjectRow({
  project,
  onActivate,
  onDeactivate,
}: {
  project: Project
  onActivate?: () => void
  onDeactivate?: () => void
}) {
  return (
    <li className="project-row">
      <Link
        href={`/work/${project.slug}`}
        className="project-row-link"
        data-cursor="view"
        onPointerEnter={onActivate}
        onPointerLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
      >
        <span className="project-number t-label">{project.number}</span>

        <span className="project-title t-display t-project">{project.title}</span>

        <span className="project-thumb" aria-hidden="true">
          <Image
            src={asset(project.coverImage.src)}
            alt=""
            fill
            sizes="(max-width: 64rem) 40vw, 320px"
            loading="lazy"
          />
        </span>

        <span className="project-meta">
          <span className="t-label project-category">{project.category}</span>
          <span className="t-label project-role">{project.role}</span>
          {project.awards.length > 0 ? (
            <span className="t-label project-award">
              <span className="award-mark" aria-hidden="true">
                ◆
              </span>
              Awarded
            </span>
          ) : null}
          <span className="t-label project-year">{project.year}</span>
        </span>

        <span className="sr-only">{project.summary}</span>
      </Link>
      <hr className="rule" />
    </li>
  )
}
