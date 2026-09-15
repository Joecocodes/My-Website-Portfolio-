import type { MediaAsset, Project, ProjectSeed } from '@/lib/types'

/**
 * ============================================================================
 * DEMO CONTENT
 * ============================================================================
 * Every project, client, award and credit below is FICTIONAL. This dataset
 * exists to exercise the layout and motion system, not to represent real
 * engagements. The site surfaces this honestly via `DEMO_CONTENT` (rendered as
 * a note in the footer) — do not remove that note while this data is in place.
 *
 * To publish real work: replace the entries in `seeds` below. prev/next links,
 * routing and the archive all derive from this array automatically.
 * See README.md § Content.
 * ============================================================================
 */
export const DEMO_CONTENT = true

/** Small helper so the seed data below stays readable. */
const img = (slug: string, name: string, alt: string, ratio: MediaAsset['ratio']): MediaAsset => ({
  src: `media/${slug}/${name}.svg`,
  alt,
  ratio,
})

const seeds: ProjectSeed[] = [
  {
    slug: 'carriere-quarterly',
    number: '01',
    title: 'Carrière Quarterly',
    year: 2026,
    category: 'Editorial Identity',
    role: 'Art Direction, Design System',
    client: 'Carrière Quarterly',
    summary: 'A masthead built for forty issues, not four',
    description:
      'A complete editorial identity for an independent quarterly on labour and craft. The system holds a fixed masthead against a grid that changes character every issue.',
    coverImage: img('carriere-quarterly', 'cover', 'Carrière Quarterly masthead set in a heavy grotesque over a bleed of layered paper stock', '4/5'),
    heroImage: img('carriere-quarterly', 'hero', 'Spread from Carrière Quarterly issue one, showing the masthead locked to a twelve-column grid', '16/9'),
    gallery: [
      {
        kind: 'text',
        heading: 'The brief',
        body: [
          'Carrière arrived with four issues of accumulated inconsistency and a masthead that had been redrawn three times. The problem was not the drawing. It was that nothing underneath it held.',
          'We rebuilt from the grid up — one structural system, one type pairing, and a colour rule that lets each issue announce itself without abandoning the whole.',
        ],
      },
      { kind: 'full', media: img('carriere-quarterly', '01', 'Masthead construction diagram showing optical spacing corrections at three sizes', '21/9'), caption: 'Masthead redrawn at three optical sizes. The large cut loses the spur entirely.' },
      { kind: 'pair', media: [img('carriere-quarterly', '02', 'Cover grid applied to issue one, typographic hierarchy in two weights', '4/5'), img('carriere-quarterly', '03', 'Cover grid applied to issue two, demonstrating the same structure under a different accent', '4/5')], caption: 'Two issues, one structure.' },
      { kind: 'quote', text: 'A masthead is a promise that the next issue will still be the same publication.', attribution: 'From the identity guidelines' },
      { kind: 'full', media: img('carriere-quarterly', '04', 'Interior editorial spread with a narrow reading column and wide margin for annotations', '3/2') },
    ],
    awards: ['Type Directors Annual — Selected, 2026'],
    credits: [
      { role: 'Art Direction', name: 'Studio credit' },
      { role: 'Editorial Lead', name: 'Client side' },
      { role: 'Print Production', name: 'External partner' },
    ],
    accentColor: '#a8442a',
    externalUrl: null,
  },
  {
    slug: 'atelier-sonde',
    number: '02',
    title: 'Atelier Sonde',
    year: 2025,
    category: 'Fashion',
    role: 'Digital Art Direction',
    client: 'Atelier Sonde',
    summary: 'A lookbook that refuses to scroll politely',
    description:
      'Seasonal digital presence for a small tailoring house. The collection is shown at full bleed, one garment at a time, with the pace set deliberately slow.',
    coverImage: img('atelier-sonde', 'cover', 'Tailored silhouette cropped tightly against a flat neutral ground', '4/5'),
    heroImage: img('atelier-sonde', 'hero', 'Full-bleed opening frame of the Atelier Sonde seasonal lookbook', '16/9'),
    gallery: [
      { kind: 'text', heading: 'Pace as art direction', body: ['Fashion sites tend to compress a collection into a grid and call it a lookbook. Sonde makes nine garments a year. A grid would flatten all of them into one.', 'So the collection is presented as a sequence, not a set — one garment per frame, each holding the viewport until you decide to move on.'] },
      { kind: 'full', media: img('atelier-sonde', '01', 'Single garment held at full viewport height with metadata set small in the lower margin', '16/9') },
      { kind: 'pair', media: [img('atelier-sonde', '02', 'Detail study of a shoulder seam at close crop', '4/5'), img('atelier-sonde', '03', 'Detail study of cuff construction and buttonhole stitching', '4/5')] },
      { kind: 'quote', text: 'Nine garments. Nine frames. Nothing competing for the same second of attention.' },
      { kind: 'full', media: img('atelier-sonde', '04', 'Closing frame showing the full collection as a contact sheet', '3/2'), caption: 'The only grid in the project, and it arrives last.' },
    ],
    awards: ['Awwwards — Honourable Mention, 2025'],
    credits: [
      { role: 'Art Direction', name: 'Studio credit' },
      { role: 'Photography', name: 'External partner' },
      { role: 'Development', name: 'Studio credit' },
    ],
    accentColor: '#2e4034',
    externalUrl: null,
  },
  {
    slug: 'koto-pavilion',
    number: '03',
    title: 'Kōtō Pavilion',
    year: 2025,
    category: 'Architecture',
    role: 'Identity, Wayfinding',
    client: 'Kōtō Pavilion',
    summary: 'Signage that reads at eleven metres and at arm’s length',
    description:
      'Identity and wayfinding for a timber exhibition pavilion. One typeface, two sizes, and a rule about where letterforms may never sit.',
    coverImage: img('koto-pavilion', 'cover', 'Wayfinding panel mounted on vertical timber slats, type reversed out in white', '4/5'),
    heroImage: img('koto-pavilion', 'hero', 'Exterior elevation of the Kōtō Pavilion with primary identity signage at entrance scale', '16/9'),
    gallery: [
      { kind: 'text', heading: 'Two distances', body: ['A pavilion is read twice: once from across a plaza, once with your hand on the door. Most wayfinding systems solve the first and improvise the second.', 'Kōtō uses a single typeface at two fixed sizes, with tracking that opens as the size drops — so the small cut stays legible against the grain of the timber.'] },
      { kind: 'full', media: img('koto-pavilion', '01', 'Entrance signage photographed at approach distance showing legibility against timber cladding', '21/9') },
      { kind: 'pair', media: [img('koto-pavilion', '02', 'Interior directional panel at eye level', '3/2'), img('koto-pavilion', '03', 'Threshold marker set into the floor plane', '3/2')] },
      { kind: 'quote', text: 'The material had a grain direction. The type had to agree with it or fight it. We chose agreement.' },
      { kind: 'full', media: img('koto-pavilion', '04', 'Full wayfinding family laid out as a specification sheet', '3/2') },
    ],
    awards: [],
    credits: [
      { role: 'Identity', name: 'Studio credit' },
      { role: 'Architecture', name: 'External partner' },
      { role: 'Fabrication', name: 'External partner' },
    ],
    accentColor: '#7a6a52',
    externalUrl: null,
  },
  {
    slug: 'north-signal',
    number: '04',
    title: 'North Signal',
    year: 2024,
    category: 'Technology',
    role: 'Product Design, Design System',
    client: 'North Signal',
    summary: 'A dense interface that stopped apologising for being dense',
    description:
      'Design system and product surface for an infrastructure monitoring tool. The brief was to make a hundred simultaneous signals readable without hiding any of them.',
    coverImage: img('north-signal', 'cover', 'Dense monitoring interface with small monospaced labels and a single accent state colour', '4/5'),
    heroImage: img('north-signal', 'hero', 'North Signal primary dashboard showing a hundred concurrent service states', '16/9'),
    gallery: [
      { kind: 'text', heading: 'Density is the product', body: ['Every prior redesign had tried to simplify by removing. Operators kept a spreadsheet open alongside the tool to get the removed information back.', 'We inverted it: keep all hundred signals on screen, and spend the entire design budget on making density scannable. Type scale, one accent, and a strict rule that colour only ever means state.'] },
      { kind: 'full', media: img('north-signal', '01', 'Interface state table showing all severity levels differentiated by shape and label, not colour alone', '16/9'), caption: 'State is carried by shape and label first. Colour is reinforcement, never the only signal.' },
      { kind: 'pair', media: [img('north-signal', '02', 'Detail view of a single service timeline', '3/2'), img('north-signal', '03', 'Alert triage queue in a compact row layout', '3/2')] },
      { kind: 'quote', text: 'Operators do not want less information. They want the same information to stop shouting all at once.' },
      { kind: 'full', media: img('north-signal', '04', 'Component inventory from the North Signal design system', '3/2') },
    ],
    awards: [],
    credits: [
      { role: 'Product Design', name: 'Studio credit' },
      { role: 'Engineering', name: 'Client side' },
    ],
    accentColor: '#3b4a6b',
    externalUrl: null,
  },
  {
    slug: 'museum-of-quiet',
    number: '05',
    title: 'Museum of Quiet',
    year: 2024,
    category: 'Cultural Institution',
    role: 'Identity, Digital',
    client: 'Museum of Quiet',
    summary: 'An institution whose identity had to survive silence',
    description:
      'Identity and digital platform for a small museum of sound and absence. The system had no photography to lean on, so structure carries everything.',
    coverImage: img('museum-of-quiet', 'cover', 'Institutional wordmark set very large with extreme negative space around it', '4/5'),
    heroImage: img('museum-of-quiet', 'hero', 'Museum of Quiet identity applied across a gallery entrance and printed programme', '16/9'),
    gallery: [
      { kind: 'text', heading: 'No images to hide behind', body: ['The collection is recordings. There is almost nothing to photograph, which removes the usual crutch of a cultural identity — a strong image programme.', 'What remains is structure: a grid that holds enormous empty areas without looking unfinished, and a type system confident enough to be the only thing on the page.'] },
      { kind: 'full', media: img('museum-of-quiet', '01', 'Exhibition poster using only type and an unusually large margin', '2/3') },
      { kind: 'pair', media: [img('museum-of-quiet', '02', 'Printed programme cover', '4/5'), img('museum-of-quiet', '03', 'Ticket and wayfinding collateral', '4/5')] },
      { kind: 'quote', text: 'Emptiness reads as intent only when the structure around it is exact.' },
      { kind: 'full', media: img('museum-of-quiet', '04', 'Digital collection browser showing recordings as typographic entries', '16/9') },
    ],
    awards: ['D&AD — Shortlist, 2024', 'Brand Impact Awards — Selected, 2024'],
    credits: [
      { role: 'Identity', name: 'Studio credit' },
      { role: 'Curation', name: 'Client side' },
      { role: 'Development', name: 'Studio credit' },
    ],
    accentColor: '#33343a',
    externalUrl: null,
  },
  {
    slug: 'low-frequencies',
    number: '06',
    title: 'Low Frequencies',
    year: 2023,
    category: 'Music',
    role: 'Art Direction, Packaging',
    client: 'Low Frequencies',
    summary: 'Twelve releases, one sleeve system, no template',
    description:
      'Art direction and sleeve system for an ambient label. Each release is visually distinct while remaining unmistakably part of the same catalogue.',
    coverImage: img('low-frequencies', 'cover', 'Record sleeve with a single geometric mark offset from centre on a flat ground', '1/1'),
    heroImage: img('low-frequencies', 'hero', 'Twelve Low Frequencies sleeves arranged in catalogue order', '16/9'),
    gallery: [
      { kind: 'text', heading: 'A system, not a template', body: ['A template makes twelve releases look like twelve printings of one release. The label wanted each record to feel like its own object and still shelve as a set.', 'The system fixes position, scale and type, and leaves the mark itself free. Structure is constant; the figure inside it never repeats.'] },
      { kind: 'full', media: img('low-frequencies', '01', 'Catalogue of twelve marks shown as a single contact sheet', '16/9'), caption: 'Twelve marks, one position.' },
      { kind: 'pair', media: [img('low-frequencies', '02', 'Sleeve front for catalogue number four', '1/1'), img('low-frequencies', '03', 'Sleeve reverse showing tracklist typography', '1/1')] },
      { kind: 'quote', text: 'Constant structure, variable figure. The shelf does the rest.' },
      { kind: 'full', media: img('low-frequencies', '04', 'Label sleeve system specification with position and scale rules', '3/2') },
    ],
    awards: [],
    credits: [
      { role: 'Art Direction', name: 'Studio credit' },
      { role: 'Print Production', name: 'External partner' },
    ],
    accentColor: '#5c3b52',
    externalUrl: null,
  },
  {
    slug: 'objet-supply',
    number: '07',
    title: 'Objet Supply',
    year: 2023,
    category: 'E-Commerce',
    role: 'Digital Design, Development',
    client: 'Objet Supply',
    summary: 'A shop that reads like a catalogue, not a funnel',
    description:
      'Storefront design for a small homeware importer. Product photography sets the pace; the commerce mechanics stay deliberately quiet.',
    coverImage: img('objet-supply', 'cover', 'Single homeware object photographed centrally against a flat warm ground', '4/5'),
    heroImage: img('objet-supply', 'hero', 'Objet Supply storefront index presenting products as catalogue entries', '16/9'),
    gallery: [
      { kind: 'text', heading: 'Quiet mechanics', body: ['Conversion patterns had accumulated until the shop was mostly interface: badges, urgency labels, three competing calls to action per product.', 'We stripped it to a catalogue. One object per entry, photography at full width, and purchase controls that are unmistakable but never the loudest thing on screen.'] },
      { kind: 'full', media: img('objet-supply', '01', 'Product detail page with full-width photography and compact purchase controls', '16/9') },
      { kind: 'pair', media: [img('objet-supply', '02', 'Catalogue index row at desktop width', '3/2'), img('objet-supply', '03', 'Same index row stacked at mobile width', '3/2')], caption: 'The mobile layout is designed, not inherited.' },
      { kind: 'quote', text: 'Nothing in a shop needs to shout if the object is photographed properly.' },
      { kind: 'full', media: img('objet-supply', '04', 'Checkout sequence shown as three compact steps', '3/2') },
    ],
    awards: [],
    credits: [
      { role: 'Design', name: 'Studio credit' },
      { role: 'Development', name: 'Studio credit' },
      { role: 'Photography', name: 'External partner' },
    ],
    accentColor: '#6b4a2e',
    externalUrl: null,
  },
  {
    slug: 'hotel-lacuna',
    number: '08',
    title: 'Hotel Lacuna',
    year: 2022,
    category: 'Hospitality',
    role: 'Identity, Environmental',
    client: 'Hotel Lacuna',
    summary: 'Seventeen rooms and a typeface that knows it',
    description:
      'Identity and environmental graphics for a seventeen-room hotel. Applied at the scale of a small building rather than a chain.',
    coverImage: img('hotel-lacuna', 'cover', 'Hotel room number rendered in a large restrained numeral on a painted door', '4/5'),
    heroImage: img('hotel-lacuna', 'hero', 'Hotel Lacuna entrance identity applied to a stone façade', '16/9'),
    gallery: [
      { kind: 'text', heading: 'Small on purpose', body: ['Hospitality identity systems are usually built to survive four hundred properties. Lacuna has one, and seventeen rooms inside it.', 'That permits things a chain cannot afford: numerals cut individually per door, printed matter with no scaling rules, signage that responds to the actual wall it sits on.'] },
      { kind: 'full', media: img('hotel-lacuna', '01', 'Corridor with room numerals at varying positions responding to door placement', '21/9') },
      { kind: 'pair', media: [img('hotel-lacuna', '02', 'Printed room directory', '4/5'), img('hotel-lacuna', '03', 'Key card and stationery set', '4/5')] },
      { kind: 'quote', text: 'One property means every application can be a decision instead of a rule.' },
      { kind: 'full', media: img('hotel-lacuna', '04', 'Full numeral set drawn for the seventeen rooms', '3/2') },
    ],
    awards: ['Hospitality Design Awards — Finalist, 2022'],
    credits: [
      { role: 'Identity', name: 'Studio credit' },
      { role: 'Interior Architecture', name: 'External partner' },
    ],
    accentColor: '#1f4d4a',
    externalUrl: null,
  },
  {
    slug: 'ines-roth',
    number: '09',
    title: 'Ines Roth',
    year: 2022,
    category: 'Personal Portfolio',
    role: 'Design, Development',
    client: 'Ines Roth',
    summary: 'A photographer’s archive of eleven thousand frames',
    description:
      'Portfolio and archive for a documentary photographer. The public edit is forty images; the archive underneath holds eleven thousand.',
    coverImage: img('ines-roth', 'cover', 'Documentary photograph cropped to a tall vertical format', '2/3'),
    heroImage: img('ines-roth', 'hero', 'Ines Roth portfolio opening frame with a single full-bleed photograph', '16/9'),
    gallery: [
      { kind: 'text', heading: 'Two audiences', body: ['A photographer needs a portfolio that shows forty images and an archive that can retrieve any of eleven thousand. These are opposite interfaces.', 'The site keeps them separate and honest: a curated sequence at the front, a fast, dense, searchable index behind it. Neither pretends to be the other.'] },
      { kind: 'full', media: img('ines-roth', '01', 'Curated sequence view showing one photograph at full bleed', '3/2') },
      { kind: 'pair', media: [img('ines-roth', '02', 'Archive index displaying dense thumbnail rows with capture metadata', '3/2'), img('ines-roth', '03', 'Filtered archive results by year and location', '3/2')] },
      { kind: 'quote', text: 'The edit is the portfolio. The archive is the proof.' },
      { kind: 'full', media: img('ines-roth', '04', 'Archive detail view with full capture metadata alongside the frame', '16/9') },
    ],
    awards: [],
    credits: [
      { role: 'Design & Development', name: 'Studio credit' },
      { role: 'Photography', name: 'Client side' },
    ],
    accentColor: '#4a4a2e',
    externalUrl: null,
  },
  {
    slug: 'tenth-street-works',
    number: '10',
    title: 'Tenth Street Works',
    year: 2026,
    category: 'Product Studio',
    role: 'Brand System, Digital',
    client: 'Tenth Street Works',
    summary: 'A studio brand assembled from its own shop drawings',
    description:
      'Brand system for a furniture and product studio. The identity is drawn from the studio’s technical documentation rather than applied on top of it.',
    coverImage: img('tenth-street-works', 'cover', 'Technical shop drawing of a chair joint used as a primary brand graphic', '4/5'),
    heroImage: img('tenth-street-works', 'hero', 'Tenth Street Works identity applied across drawings, labels and packaging', '16/9'),
    gallery: [
      { kind: 'text', heading: 'The drawings were already the brand', body: ['The studio had twenty years of shop drawings — dimensioned, annotated, unmistakably theirs — and a logo designed by somebody else in a week.', 'We discarded the logo and built the system out of the drawings: their line weights, their annotation type, their dimension conventions, formalised into a usable set.'] },
      { kind: 'full', media: img('tenth-street-works', '01', 'Dimension and annotation conventions formalised as brand specification', '21/9'), caption: 'Existing conventions, formalised rather than replaced.' },
      { kind: 'pair', media: [img('tenth-street-works', '02', 'Product label applied to a finished piece', '1/1'), img('tenth-street-works', '03', 'Packaging with drawing detail printed at full scale', '1/1')] },
      { kind: 'quote', text: 'The most credible identity a workshop can have is the one it was already drawing.' },
      { kind: 'full', media: img('tenth-street-works', '04', 'Complete brand system sheet showing line weights and type specimens', '3/2') },
    ],
    awards: ['Dezeen Awards — Longlist, 2026'],
    credits: [
      { role: 'Brand System', name: 'Studio credit' },
      { role: 'Development', name: 'Studio credit' },
    ],
    accentColor: '#8a3a3a',
    externalUrl: null,
  },
]

/**
 * prev/next derived from index order and wrapped, so the chain is always
 * complete and can never disagree with `seeds`.
 */
export const projects: Project[] = seeds.map((seed, i) => ({
  ...seed,
  previousProjectSlug: seeds[(i - 1 + seeds.length) % seeds.length].slug,
  nextProjectSlug: seeds[(i + 1) % seeds.length].slug,
}))

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const projectSlugs = projects.map((p) => p.slug)

/** Distinct categories in first-appearance order, for the archive filters. */
export const categories = Array.from(new Set(projects.map((p) => p.category)))

export const workingYears = {
  from: Math.min(...projects.map((p) => p.year)),
  to: Math.max(...projects.map((p) => p.year)),
}
