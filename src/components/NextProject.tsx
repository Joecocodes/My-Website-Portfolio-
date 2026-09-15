'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/types'
import { asset } from '@/lib/asset'

/**
 * End-of-case-study navigation.
 *
 * The next project gets an oversized, inviting block whose background image
 * fades in on hover OR focus — so the invitation is identical for pointer and
 * keyboard users. The accent tint comes from the destination project, not this
 * one, which previews where you are about to go.
 */
export function NextProject({
  next,
  previous,
}: {
  next: Project
  previous: Project
}) {
  const [active, setActive] = useState(false)

  return (
    <nav className="next-project-nav" aria-label="Project navigation">
      <div className="shell next-secondary">
        <Link href={`/work/${previous.slug}`} className="link-rule link-arrow t-label t-label-ink" data-cursor="link">
          <span className="arrow arrow-back" aria-hidden="true">←</span> Previous — {previous.title}
        </Link>
        <Link href="/" className="link-rule t-label t-label-ink" data-cursor="link">
          All work
        </Link>
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="next-project"
        data-active={active}
        data-cursor="view"
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={{ ['--accent' as string]: next.accentColor }}
      >
        <span className="next-project-bg" aria-hidden="true">
          <Image
            src={asset(next.heroImage.src)}
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
          />
        </span>

        <span className="next-project-inner shell">
          <span className="t-label next-project-label">Next project</span>
          <span className="t-display t-project next-project-title">{next.title}</span>
          <span className="t-label next-project-meta">
            {next.category} / {next.year}
          </span>
        </span>
      </Link>
    </nav>
  )
}
