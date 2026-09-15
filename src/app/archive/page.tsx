import type { Metadata } from 'next'
import { categories, projects, workingYears } from '@/data/projects'
import { SectionLabel } from '@/components/SectionLabel'
import { TextReveal } from '@/components/TextReveal'
import { ArchiveGrid } from '@/components/ArchiveGrid'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Complete project archive, grouped by discipline.',
}

export default function ArchivePage() {
  return (
    <div className="archive-page shell">
      <TextReveal
        as="h1"
        lines={['Archive']}
        className="t-display t-statement archive-heading"
        trigger="load"
      />

      <SectionLabel right={`${workingYears.from}–${workingYears.to}`}>
        {projects.length} projects
      </SectionLabel>

      <ArchiveGrid projects={projects} categories={categories} />
    </div>
  )
}
