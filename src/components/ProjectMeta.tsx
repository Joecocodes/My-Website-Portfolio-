import type { Project } from '@/lib/types'

/** Compact, visually secondary metadata block for a case study. */
export function ProjectMeta({ project }: { project: Project }) {
  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: 'Client', value: project.client },
    { label: 'Discipline', value: project.category },
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
  ]

  if (project.awards.length > 0) {
    rows.push({
      label: 'Recognition',
      value: (
        <ul className="meta-list">
          {project.awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      ),
    })
  }

  rows.push({
    label: 'Credits',
    value: (
      <ul className="meta-list">
        {project.credits.map((credit) => (
          <li key={`${credit.role}-${credit.name}`}>
            {credit.role} — {credit.name}
          </li>
        ))}
      </ul>
    ),
  })

  if (project.externalUrl) {
    rows.push({
      label: 'Live',
      value: (
        <a href={project.externalUrl} className="link-rule link-arrow" data-cursor="link">
          Visit site <span className="arrow" aria-hidden="true">→</span>
        </a>
      ),
    })
  }

  return (
    <dl className="project-meta-grid">
      {rows.map((row) => (
        <div className="project-meta-row" key={row.label}>
          <dt className="t-label">{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
