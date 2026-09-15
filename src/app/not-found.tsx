import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="notfound-page shell">
      <p className="t-label">404</p>
      <h1 className="t-display t-statement">This page is not in the index.</h1>
      <p className="t-read">
        The link may be out of date, or the project may have been renamed.
      </p>
      <p>
        <Link href="/" className="link-rule link-arrow t-label t-label-ink">
          Back to selected work <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  )
}
