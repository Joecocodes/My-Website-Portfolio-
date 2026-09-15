import type { NarrativeBlock } from '@/lib/types'
import { Media } from './Media'
import { MediaReveal } from './MediaReveal'
import { TextReveal } from './TextReveal'

/**
 * Renders the narrative sequence. Media dominates; text sits in a narrow
 * reading column. Motion is reserved for media entering view and for the pull
 * quotes — not applied to every element.
 */
export function ProjectGallery({ blocks }: { blocks: NarrativeBlock[] }) {
  return (
    <div className="project-gallery">
      {blocks.map((block, i) => {
        const key = `${block.kind}-${i}`

        if (block.kind === 'full') {
          return (
            <figure className="block-full" key={key}>
              <MediaReveal parallax={6}>
                <Media asset={block.media} sizes="100vw" />
              </MediaReveal>
              {block.caption ? (
                <figcaption className="shell t-label block-caption">{block.caption}</figcaption>
              ) : null}
            </figure>
          )
        }

        if (block.kind === 'pair') {
          return (
            <figure className="block-pair shell" key={key}>
              <div className="block-pair-grid">
                {block.media.map((asset) => (
                  <MediaReveal key={asset.src}>
                    <Media asset={asset} sizes="(max-width: 48rem) 100vw, 50vw" />
                  </MediaReveal>
                ))}
              </div>
              {block.caption ? (
                <figcaption className="t-label block-caption">{block.caption}</figcaption>
              ) : null}
            </figure>
          )
        }

        if (block.kind === 'text') {
          return (
            <div className="block-text shell" key={key}>
              {block.heading ? <h2 className="t-label block-heading">{block.heading}</h2> : null}
              <div className="block-body">
                {block.body.map((paragraph) => (
                  <p className="t-read" key={paragraph.slice(0, 32)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )
        }

        return (
          <blockquote className="block-quote shell" key={key}>
            <TextReveal
              as="p"
              lines={[block.text]}
              className="t-display t-statement block-quote-text"
            />
            {block.attribution ? (
              <cite className="t-label block-quote-cite">{block.attribution}</cite>
            ) : null}
          </blockquote>
        )
      })}
    </div>
  )
}
