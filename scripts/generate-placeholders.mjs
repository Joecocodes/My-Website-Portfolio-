/**
 * Generates the local placeholder imagery in public/media/<slug>/.
 *
 * These are abstract editorial compositions, not photographs — deliberately, so
 * the site is self-contained (no external image host, no link rot) and the art
 * direction stays under our control. They are deterministic: the same slug
 * always produces the same composition, so builds are reproducible.
 *
 * Run:  node scripts/generate-placeholders.mjs
 *
 * To replace with real imagery, see README.md § Replacing images. Nothing here
 * runs at build time — the output is committed.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const OUT = 'public/media'

const PAPER = '#ecece6'
const PAPER_DEEP = '#e2e2da'
const INK = '#111111'

/**
 * The asset list is EXTRACTED from src/data/projects.ts rather than duplicated,
 * so a ratio can never drift between the data and the generated file. Accents
 * are read from the same source.
 */
const dataSrc = await readFile('src/data/projects.ts', 'utf8')

const RATIOS = ['16/9', '4/3', '3/2', '1/1', '4/5', '2/3', '21/9']

const imgRe = new RegExp(
  String.raw`img\('([a-z0-9-]+)',\s*'([a-z0-9]+)',\s*'[^']*',\s*'(` +
    RATIOS.map((r) => r.replace('/', String.raw`\/`)).join('|') +
    String.raw`)'\)`,
  'g'
)

const entries = []
for (const m of dataSrc.matchAll(imgRe)) {
  entries.push({ slug: m[1], name: m[2], ratio: m[3] })
}
if (entries.length === 0) throw new Error('no media entries found in projects.ts')

const accents = new Map()
for (const m of dataSrc.matchAll(/slug: '([a-z0-9-]+)'[\s\S]*?accentColor: '(#[0-9a-f]{6})'/g)) {
  accents.set(m[1], m[2])
}
const numbers = new Map()
for (const m of dataSrc.matchAll(/slug: '([a-z0-9-]+)',\s*\n\s*number: '(\d{2})'/g)) {
  numbers.set(m[1], m[2])
}

/** Long edge stays ~1600px; the short edge follows the declared ratio. */
function dimsFor(ratio) {
  const [rw, rh] = ratio.split('/').map(Number)
  const long = 1600
  if (rw >= rh) return [long, Math.round((long * rh) / rw)]
  return [Math.round((long * rw) / rh), long]
}

/* -------------------------------------------------------------------------- */
/* Deterministic PRNG so output is stable across runs                          */
/* -------------------------------------------------------------------------- */
function seedFrom(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
function rng(seed) {
  let s = seed || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)]
const range = (r, lo, hi) => lo + r() * (hi - lo)

const wrap = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="presentation">` +
  `<rect width="${w}" height="${h}" fill="${PAPER}"/>${body}</svg>\n`

/** Faint hairline grid, the structural constant across every composition. */
function grid(w, h, cols, opacity = 0.06) {
  const step = w / cols
  let out = `<g stroke="${INK}" stroke-opacity="${opacity}" stroke-width="1">`
  for (let i = 1; i < cols; i++) {
    const x = (i * step).toFixed(1)
    out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`
  }
  return out + '</g>'
}

/* -------------------------------------------------------------------------- */
/* Composition families                                                        */
/* -------------------------------------------------------------------------- */

/**
 * cover — oversized numeral, accent bar, grid.
 *
 * The numeral is sized BELOW the frame height on purpose. An earlier version
 * used 1.05-1.25x, which looked deliberate at full size but reduced to an
 * illegible blob inside the 420px hover preview, where covers are seen most.
 * It now bleeds off the baseline without losing its identity when cropped.
 */
function cover(w, h, accent, number, r) {
  const size = h * range(r, 0.6, 0.72)
  const x = w * range(r, 0.06, 0.13)
  const baseline = h * range(r, 0.8, 0.88)
  const barY = h * range(r, 0.12, 0.2)
  return wrap(
    w,
    h,
    grid(w, h, 4) +
      `<rect x="0" y="${barY.toFixed(0)}" width="${(w * range(r, 0.3, 0.52)).toFixed(0)}" height="${(h * 0.012).toFixed(1)}" fill="${accent}"/>` +
      `<text x="${x.toFixed(0)}" y="${baseline.toFixed(0)}" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="${size.toFixed(0)}" letter-spacing="-0.06em" fill="${INK}" fill-opacity="0.9">${number}</text>` +
      `<rect x="0" y="${(h - h * 0.002).toFixed(1)}" width="${w}" height="${(h * 0.002).toFixed(1)}" fill="${INK}" fill-opacity="0.14"/>`
  )
}

/** hero — horizon bands with one accent rule, wide and calm. */
function hero(w, h, accent, r) {
  const bands = Math.floor(range(r, 3, 5))
  let body = grid(w, h, 12)
  let y = 0
  for (let i = 0; i < bands; i++) {
    const bh = h * range(r, 0.12, 0.3)
    const fill = i % 2 === 0 ? PAPER_DEEP : PAPER
    body += `<rect x="0" y="${y.toFixed(0)}" width="${w}" height="${bh.toFixed(0)}" fill="${fill}"/>`
    y += bh
  }
  const ry = h * range(r, 0.42, 0.68)
  body += `<rect x="${(w * range(r, 0.06, 0.2)).toFixed(0)}" y="${ry.toFixed(0)}" width="${(w * range(r, 0.26, 0.5)).toFixed(0)}" height="2" fill="${accent}"/>`
  const s = Math.min(w, h) * range(r, 0.1, 0.18)
  body += `<rect x="${(w * range(r, 0.6, 0.82)).toFixed(0)}" y="${(h * range(r, 0.2, 0.55)).toFixed(0)}" width="${s.toFixed(0)}" height="${s.toFixed(0)}" fill="${INK}" fill-opacity="0.82"/>`
  return wrap(w, h, body)
}

/** 01 — dense hairline rule field broken once by the accent. */
function ruleField(w, h, accent, r) {
  const lines = Math.floor(range(r, 26, 40))
  const gap = h / lines
  const breakAt = Math.floor(range(r, 6, lines - 6))
  let body = ''
  for (let i = 0; i < lines; i++) {
    const y = (i * gap + gap / 2).toFixed(1)
    const inset = w * range(r, 0.02, 0.22)
    const isBreak = i === breakAt
    body +=
      `<line x1="${inset.toFixed(0)}" y1="${y}" x2="${(w - inset).toFixed(0)}" y2="${y}" ` +
      `stroke="${isBreak ? accent : INK}" stroke-opacity="${isBreak ? 1 : 0.22}" stroke-width="${isBreak ? 3 : 1}"/>`
  }
  return wrap(w, h, body)
}

/** 02 / 03 — single geometric figure, off-centre, with an accent counterpoint. */
function figure(w, h, accent, r) {
  const cx = w * range(r, 0.36, 0.62)
  const cy = h * range(r, 0.38, 0.6)
  const rad = Math.min(w, h) * range(r, 0.2, 0.31)
  const shape = pick(r, ['circle', 'arc', 'square'])
  let body = grid(w, h, 4)
  if (shape === 'circle') {
    body += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${INK}" fill-opacity="0.86"/>`
  } else if (shape === 'square') {
    body += `<rect x="${(cx - rad).toFixed(0)}" y="${(cy - rad).toFixed(0)}" width="${(rad * 2).toFixed(0)}" height="${(rad * 2).toFixed(0)}" fill="${INK}" fill-opacity="0.86"/>`
  } else {
    body +=
      `<path d="M ${(cx - rad).toFixed(0)} ${cy.toFixed(0)} A ${rad.toFixed(0)} ${rad.toFixed(0)} 0 0 1 ${(cx + rad).toFixed(0)} ${cy.toFixed(0)} Z" fill="${INK}" fill-opacity="0.86"/>`
  }
  const dr = Math.min(w, h) * 0.035
  body += `<circle cx="${(w * range(r, 0.72, 0.88)).toFixed(0)}" cy="${(h * range(r, 0.14, 0.3)).toFixed(0)}" r="${dr.toFixed(0)}" fill="${accent}"/>`
  return wrap(w, h, body)
}

/** 04 — specimen sheet: a measured grid of small tonal blocks. */
function specimen(w, h, accent, r) {
  const cols = Math.floor(range(r, 5, 8))
  const rows = Math.floor(range(r, 3, 5))
  const padX = w * 0.06
  const padY = h * 0.08
  const cw = (w - padX * 2) / cols
  const ch = (h - padY * 2) / rows
  const accentCell = Math.floor(r() * cols * rows)
  let body = ''
  for (let i = 0; i < cols * rows; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = padX + col * cw
    const y = padY + row * ch
    const inset = Math.min(cw, ch) * 0.1
    const opacity = i === accentCell ? 1 : range(r, 0.08, 0.5).toFixed(2)
    body +=
      `<rect x="${(x + inset).toFixed(1)}" y="${(y + inset).toFixed(1)}" ` +
      `width="${(cw - inset * 2).toFixed(1)}" height="${(ch - inset * 2).toFixed(1)}" ` +
      `fill="${i === accentCell ? accent : INK}" fill-opacity="${opacity}"/>`
  }
  body += `<rect x="${padX.toFixed(0)}" y="${(h - padY * 0.55).toFixed(0)}" width="${(w - padX * 2).toFixed(0)}" height="1" fill="${INK}" fill-opacity="0.2"/>`
  return wrap(w, h, body)
}

/* -------------------------------------------------------------------------- */
/* Emit                                                                        */
/* -------------------------------------------------------------------------- */
let count = 0
for (const { slug, name, ratio } of entries) {
  const [w, h] = dimsFor(ratio)
  const accent = accents.get(slug) ?? '#a8442a'
  const number = numbers.get(slug) ?? '00'
  const r = rng(seedFrom(`${slug}:${name}`))

  let svg
  if (name === 'cover') svg = cover(w, h, accent, number, r)
  else if (name === 'hero') svg = hero(w, h, accent, r)
  else if (name === '01') svg = ruleField(w, h, accent, r)
  else if (name === '04') svg = specimen(w, h, accent, r)
  else svg = figure(w, h, accent, r)

  const file = join(OUT, slug, `${name}.svg`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, svg, 'utf8')
  count++
}

/** One shared abstract asset for /about. */
{
  const r = rng(seedFrom('about:portrait'))
  await writeFile(join(OUT, 'about-visual.svg'), hero(1600, 1000, '#a8442a', r), 'utf8')
  count++
}

console.log(`generated ${count} placeholder assets in ${OUT}/`)
