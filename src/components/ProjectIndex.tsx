'use client'

import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/lib/types'
import { ensureGsap, prefersReducedMotion, useFinePointer } from '@/lib/motion'
import { ProjectPreview } from './ProjectPreview'
import { ProjectRow } from './ProjectRow'

/**
 * The curated work index — a list, not a deck of cards.
 *
 * Hover previewing is only wired up once a fine pointer is confirmed, so touch
 * and hybrid-touch devices get the static thumbnails inside each row instead.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const finePointer = useFinePointer()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const list = useRef<HTMLUListElement>(null)

  // Staggered entrance for the rows themselves.
  useEffect(() => {
    const el = list.current
    if (!el || prefersReducedMotion()) return

    const { gsap, ScrollTrigger } = ensureGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.project-row'),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <>
      <ul className="project-list" ref={list}>
        {projects.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            onActivate={finePointer ? () => setActiveSlug(project.slug) : undefined}
            onDeactivate={finePointer ? () => setActiveSlug(null) : undefined}
          />
        ))}
      </ul>

      {finePointer ? <ProjectPreview projects={projects} activeSlug={activeSlug} /> : null}
    </>
  )
}
