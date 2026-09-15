/**
 * Content model for the portfolio.
 *
 * Narrative blocks are a discriminated union so a case study can alternate
 * between full-bleed media, two-column media, a narrow reading column and an
 * oversized pull quote without any block carrying fields it does not use.
 */

export type MediaAsset = {
  /** Path relative to /public, e.g. 'media/carriere-quarterly/hero.svg'. */
  src: string
  /** Descriptive alt text. Empty string ONLY for purely decorative media. */
  alt: string
  /** Intrinsic ratio, used to reserve space and keep CLS at zero. */
  ratio: '16/9' | '4/3' | '3/2' | '1/1' | '4/5' | '2/3' | '21/9'
}

export type NarrativeBlock =
  | { kind: 'full'; media: MediaAsset; caption?: string }
  | { kind: 'pair'; media: [MediaAsset, MediaAsset]; caption?: string }
  | { kind: 'text'; heading?: string; body: string[] }
  | { kind: 'quote'; text: string; attribution?: string }

export type Credit = {
  role: string
  name: string
}

export type ProjectCategory =
  | 'Editorial Identity'
  | 'Fashion'
  | 'Architecture'
  | 'Technology'
  | 'Cultural Institution'
  | 'Music'
  | 'E-Commerce'
  | 'Hospitality'
  | 'Personal Portfolio'
  | 'Product Studio'

/**
 * Authored shape. prev/next are intentionally absent here — they are derived
 * from index order in `projects.ts` so the chain can never fall out of sync
 * with the list when a project is added, removed or reordered.
 */
export type ProjectSeed = {
  slug: string
  /** Two-digit index label shown in the UI, e.g. '01'. */
  number: string
  title: string
  year: number
  category: ProjectCategory
  role: string
  client: string
  /** One short phrase. Used on the homepage index — never a paragraph. */
  summary: string
  /** One or two sentences. Used in the case-study header only. */
  description: string
  coverImage: MediaAsset
  heroImage: MediaAsset
  gallery: NarrativeBlock[]
  awards: string[]
  credits: Credit[]
  /** Muted, editorial. Used sparingly as a single per-project accent. */
  accentColor: string
  /** Optional outbound link. Null for the demo dataset. */
  externalUrl: string | null
}

export type Project = ProjectSeed & {
  nextProjectSlug: string
  previousProjectSlug: string
}
