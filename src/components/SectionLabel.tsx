import type { ReactNode } from 'react'

/**
 * Small uppercase section marker with a hairline rule. Used instead of headings
 * wherever the label is structural rather than a document heading.
 */
export function SectionLabel({
  children,
  right,
  id,
}: {
  children: ReactNode
  right?: ReactNode
  id?: string
}) {
  return (
    <div className="section-label" id={id}>
      <span className="t-label">{children}</span>
      {right ? <span className="t-label">{right}</span> : null}
    </div>
  )
}
