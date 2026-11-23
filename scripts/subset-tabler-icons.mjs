// Generates a small Tabler Icons build containing only the icons this project uses.
//
// The full icon set is ~760 KB (woff2) + ~260 KB of CSS, which was loaded on every
// page. This script scans the source for `ti-*` class names and writes:
//   assets/fonts/tabler-icons-subset.css
//   assets/fonts/tabler-icons-subset.woff
//
// It runs automatically before `npm run dev` / `npm run build`, so a newly used
// icon is picked up without any manual step. Run it by hand with:
//   npm run icons:subset
//
// It has no dependencies (Node built-ins only).
//
// Safety net: the generated CSS still declares the full font as a fallback face,
// so a glyph that is not in the subset is fetched from the full font on demand.

import { readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fontsDir = join(root, 'assets', 'fonts')
const SCAN_DIRS = ['components', 'pages', 'layouts', 'composables', 'utils', 'plugins', 'middleware', 'assets/scss']
const SCAN_FILES = ['app.vue', 'error.vue']
const SCAN_EXT = new Set(['.vue', '.ts', '.js', '.mjs', '.css', '.scss', '.json'])

async function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, out)
    else if (SCAN_EXT.has(extname(entry.name))) out.push(full)
  }
  return out
}

// ---------------------------------------------------------------------------
// Minimal TrueType subsetter: keeps the outlines of the wanted glyphs only and
// writes the result as WOFF. Glyph ids are left unchanged (unused glyphs become
// empty), which keeps hmtx/maxp/hhea valid without rewriting them.
// ---------------------------------------------------------------------------

const pad4 = (n) => (n + 3) & ~3

function readTables(ttf) {
  const tables = new Map()
  const numTables = ttf.readUInt16BE(4)
  for (let i = 0; i < numTables; i++) {
    const o = 12 + i * 16
    const offset = ttf.readUInt32BE(o + 8)
    const length = ttf.readUInt32BE(o + 12)
    tables.set(ttf.toString('latin1', o, o + 4), ttf.subarray(offset, offset + length))
  }
  return tables
}

// codepoint -> glyph id, from the font's format 12 / format 4 cmap subtables
function readCmap(cmap) {
  const map = new Map()
  const numSub = cmap.readUInt16BE(2)
  const subs = []
  for (let i = 0; i < numSub; i++) {
    const off = cmap.readUInt32BE(8 + i * 8)
    subs.push({ off, format: cmap.readUInt16BE(off) })
  }
  const f12 = subs.find((s) => s.format === 12)
  const f4 = subs.find((s) => s.format === 4)
  if (f12) {
    const nGroups = cmap.readUInt32BE(f12.off + 12)
    for (let g = 0; g < nGroups; g++) {
      const o = f12.off + 16 + g * 12
      const start = cmap.readUInt32BE(o)
      const end = cmap.readUInt32BE(o + 4)
      const gid = cmap.readUInt32BE(o + 8)
      for (let c = start; c <= end; c++) map.set(c, gid + (c - start))
    }
  } else if (f4) {
    const o = f4.off
    const segX2 = cmap.readUInt16BE(o + 6)
    const endO = o + 14
    const startO = endO + segX2 + 2
    const deltaO = startO + segX2
    const rangeO = deltaO + segX2
    for (let s = 0; s < segX2; s += 2) {
      const end = cmap.readUInt16BE(endO + s)
      const start = cmap.readUInt16BE(startO + s)
      const delta = cmap.readInt16BE(deltaO + s)
      const range = cmap.readUInt16BE(rangeO + s)
      for (let c = start; c <= end && c !== 0xffff; c++) {
        let gid
        if (range === 0) gid = (c + delta) & 0xffff
        else {
          gid = cmap.readUInt16BE(rangeO + s + range + (c - start) * 2)
          if (gid !== 0) gid = (gid + delta) & 0xffff
        }
        if (gid) map.set(c, gid)
      }
    }
  } else {
    throw new Error('unsupported cmap format')
  }
  return map
}

// A single Windows/Unicode BMP format 4 subtable, one segment per codepoint.
function buildCmap(pairs) {
  const segs = [...pairs].sort((a, b) => a[0] - b[0]).filter(([cp]) => cp < 0xffff)
  const segCount = segs.length + 1 // + terminating 0xFFFF segment
  const subLen = 16 + segCount * 8
  const buf = Buffer.alloc(12 + subLen)
  buf.writeUInt16BE(0, 0) // version
  buf.writeUInt16BE(1, 2) // numTables
  buf.writeUInt16BE(3, 4) // platform: Windows
  buf.writeUInt16BE(1, 6) // encoding: Unicode BMP
  buf.writeUInt32BE(12, 8)
  let o = 12
  const pow = 2 ** Math.floor(Math.log2(segCount))
  buf.writeUInt16BE(4, o)
  buf.writeUInt16BE(subLen, o + 2)
  buf.writeUInt16BE(0, o + 4)
  buf.writeUInt16BE(segCount * 2, o + 6)
  buf.writeUInt16BE(pow * 2, o + 8)
  buf.writeUInt16BE(Math.log2(pow), o + 10)
  buf.writeUInt16BE(segCount * 2 - pow * 2, o + 12)
  const endO = o + 14
  const startO = endO + segCount * 2 + 2
  const deltaO = startO + segCount * 2
  const rangeO = deltaO + segCount * 2
  segs.forEach(([cp, gid], i) => {
    buf.writeUInt16BE(cp, endO + i * 2)
    buf.writeUInt16BE(cp, startO + i * 2)
    buf.writeUInt16BE((gid - cp) & 0xffff, deltaO + i * 2)
    buf.writeUInt16BE(0, rangeO + i * 2)
  })
  const last = segs.length
  buf.writeUInt16BE(0xffff, endO + last * 2)
  buf.writeUInt16BE(0xffff, startO + last * 2)
  buf.writeUInt16BE(1, deltaO + last * 2)
  buf.writeUInt16BE(0, rangeO + last * 2)
  return buf
}

function tableChecksum(data) {
  let sum = 0
  const padded = Buffer.alloc(pad4(data.length))
  data.copy(padded)
  for (let i = 0; i < padded.length; i += 4) sum = (sum + padded.readUInt32BE(i)) >>> 0
  return sum
}

function subsetToWoff(ttf, codepoints) {
  const tables = readTables(ttf)
  const head = Buffer.from(tables.get('head'))
  const glyf = tables.get('glyf')
  const loca = tables.get('loca')
  const numGlyphs = tables.get('maxp').readUInt16BE(4)
  const longLoca = head.readInt16BE(50) === 1
  const glyphOffset = (i) => (longLoca ? loca.readUInt32BE(i * 4) : loca.readUInt16BE(i * 2) * 2)

  const cmap = readCmap(tables.get('cmap'))
  const pairs = []
  const keep = new Set([0]) // .notdef
  for (const cp of codepoints) {
    const gid = cmap.get(cp)
    if (gid === undefined) continue
    pairs.push([cp, gid])
    keep.add(gid)
  }

  // Composite glyphs reference other glyphs: keep those too.
  const queue = [...keep]
  while (queue.length) {
    const gid = queue.pop()
    const start = glyphOffset(gid)
    const end = glyphOffset(gid + 1)
    if (end - start < 10 || glyf.readInt16BE(start) >= 0) continue
    let p = start + 10
    for (;;) {
      const flags = glyf.readUInt16BE(p)
      const component = glyf.readUInt16BE(p + 2)
      if (!keep.has(component)) { keep.add(component); queue.push(component) }
      p += 4 + (flags & 0x0001 ? 4 : 2)
      if (flags & 0x0008) p += 2
      else if (flags & 0x0040) p += 4
      else if (flags & 0x0080) p += 8
      if (!(flags & 0x0020)) break
    }
  }

  const chunks = []
  const newLoca = Buffer.alloc((numGlyphs + 1) * 4)
  let offset = 0
  for (let gid = 0; gid < numGlyphs; gid++) {
    newLoca.writeUInt32BE(offset, gid * 4)
    if (!keep.has(gid)) continue
    const start = glyphOffset(gid)
    const end = glyphOffset(gid + 1)
    if (end <= start) continue
    const data = Buffer.alloc(pad4(end - start))
    glyf.copy(data, 0, start, end)
    chunks.push(data)
    offset += data.length
  }
  newLoca.writeUInt32BE(offset, numGlyphs * 4)

  head.writeInt16BE(1, 50) // long loca offsets
  head.writeUInt32BE(0, 8) // checkSumAdjustment (not verified by browsers)

  // post v3: drops the ~77 KB of glyph names
  const post = Buffer.alloc(32)
  tables.get('post').copy(post, 0, 0, 32)
  post.writeUInt32BE(0x00030000, 0)

  const out = new Map([
    ['OS/2', tables.get('OS/2')],
    ['cmap', buildCmap(pairs)],
    ['glyf', Buffer.concat(chunks)],
    ['head', head],
    ['hhea', tables.get('hhea')],
    ['hmtx', tables.get('hmtx')],
    ['loca', newLoca],
    ['maxp', tables.get('maxp')],
    ['name', tables.get('name')],
    ['post', post],
  ]) // GSUB (icon-name ligatures, 144 KB) is intentionally dropped; CSS classes do not use it.

  const tags = [...out.keys()].sort()
  const headerLen = 44 + tags.length * 20
  const dir = Buffer.alloc(headerLen)
  const body = []
  let pos = headerLen
  let sfntSize = 12 + tags.length * 16
  tags.forEach((tag, i) => {
    const orig = out.get(tag)
    const deflated = deflateSync(orig, { level: 9 })
    const data = deflated.length < orig.length ? deflated : orig
    const e = 44 + i * 20
    dir.write(tag, e, 'latin1')
    dir.writeUInt32BE(pos, e + 4)
    dir.writeUInt32BE(data.length, e + 8)
    dir.writeUInt32BE(orig.length, e + 12)
    dir.writeUInt32BE(tableChecksum(orig), e + 16)
    const padded = Buffer.alloc(pad4(data.length))
    data.copy(padded)
    body.push(padded)
    pos += padded.length
    sfntSize += pad4(orig.length)
  })
  dir.write('wOFF', 0, 'latin1')
  dir.writeUInt32BE(ttf.readUInt32BE(0), 4) // flavor
  dir.writeUInt32BE(pos, 8) // total length
  dir.writeUInt16BE(tags.length, 12)
  dir.writeUInt32BE(sfntSize, 16)
  dir.writeUInt16BE(1, 20) // major version
  return Buffer.concat([dir, ...body])
}

// ---------------------------------------------------------------------------

async function main() {
  const fullCss = await readFile(join(fontsDir, 'tabler-icons.css'), 'utf8')

  // name -> css escape (e.g. "arrow-right" -> "ea1f")
  const iconMap = new Map()
  for (const m of fullCss.matchAll(/\.ti-([a-z0-9-]+):before\s*\{\s*content:\s*"\\([0-9a-f]+)";?\s*\}/gi)) {
    iconMap.set(m[1], m[2].toLowerCase())
  }

  const files = [
    ...(await Promise.all(SCAN_DIRS.map((d) => walk(join(root, d))))).flat(),
    ...SCAN_FILES.map((f) => join(root, f)).filter(existsSync),
  ]

  const usedNames = new Set()
  const codepoints = new Set()
  for (const file of files) {
    if (file.endsWith('tabler-icons-subset.css')) continue
    const src = await readFile(file, 'utf8')
    for (const m of src.matchAll(/\bti-([a-z0-9]+(?:-[a-z0-9]+)*)/g)) {
      if (iconMap.has(m[1])) usedNames.add(m[1])
    }
    // Glyphs referenced directly in stylesheets (content: "\ea1f" or the raw character).
    for (const m of src.matchAll(/\\(e[a-f][0-9a-f]{2}|f[0-9a-f]{3})\b/gi)) codepoints.add(parseInt(m[1], 16))
    for (const ch of src) {
      const cp = ch.codePointAt(0)
      if (cp >= 0xea00 && cp <= 0xfffe) codepoints.add(cp)
    }
  }
  for (const name of usedNames) codepoints.add(parseInt(iconMap.get(name), 16))
  // The font also has (blank) glyphs for 0-9, a-z and "_". Keep them so stray text
  // inside an icon element renders exactly as before instead of pulling the full font.
  for (const ch of '0123456789_abcdefghijklmnopqrstuvwxyz') codepoints.add(ch.codePointAt(0))

  const sorted = [...codepoints].sort((a, b) => a - b)
  const woff = subsetToWoff(await readFile(join(fontsDir, 'tabler-icons.ttf')), sorted)

  // Full font = every other icon codepoint, so the two faces never overlap and the
  // full font is requested only when an icon outside the subset is really rendered.
  const restRanges = []
  let from = 0xea00
  for (const cp of sorted.filter((c) => c >= 0xea00)) {
    if (cp > from) restRanges.push([from, cp - 1])
    from = cp + 1
  }
  if (from <= 0xffff) restRanges.push([from, 0xffff])
  const hex = (n) => n.toString(16).toUpperCase()
  const restRange = restRanges.map(([a, b]) => (a === b ? `U+${hex(a)}` : `U+${hex(a)}-${hex(b)}`)).join(',')

  // U+20 (space) is listed so this face is the "first available font" for icon
  // elements: line metrics then come from the icon font, exactly as with the full set.
  const unicodeRange = ['U+20', ...sorted.map((cp) => `U+${hex(cp)}`)].join(',')
  const rules = [...usedNames].sort().map((n) => `.ti-${n}:before{content:"\\${iconMap.get(n)}"}`).join('\n')

  const css = `/*!
 * Tabler Icons 2.40.0 by tabler - https://tabler.io
 * License - https://github.com/tabler/tabler-icons/blob/master/LICENSE
 *
 * GENERATED FILE - do not edit. Regenerate with: npm run icons:subset
 * Contains only the ${usedNames.size} icons used in this project.
 */
/* Full font: only downloaded if a glyph outside the subset is actually rendered. */
@font-face {
  font-family: "tabler-icons";
  font-style: normal;
  font-weight: 400;
  src: url("./tabler-icons.woff2?v2.40.0") format("woff2"), url("./tabler-icons.woff?") format("woff"), url("./tabler-icons.ttf?v2.40.0") format("truetype");
  unicode-range: ${restRange};
}
/* Subset font: the icons this project uses. */
@font-face {
  font-family: "tabler-icons";
  font-style: normal;
  font-weight: 400;
  src: url("./tabler-icons-subset.woff") format("woff");
  unicode-range: ${unicodeRange};
}
.ti {
  font-family: "tabler-icons" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
${rules}
`

  const cssPath = join(fontsDir, 'tabler-icons-subset.css')
  const fontPath = join(fontsDir, 'tabler-icons-subset.woff')
  const prevCss = existsSync(cssPath) ? await readFile(cssPath, 'utf8') : ''
  const prevFont = existsSync(fontPath) ? await readFile(fontPath) : null
  // Skip rewriting when nothing changed so dev/build runs do not dirty the git tree.
  if (prevCss === css && prevFont && prevFont.equals(woff)) {
    console.log(`[icons] subset up to date (${usedNames.size} icons)`)
    return
  }
  await writeFile(fontPath, woff)
  await writeFile(cssPath, css)
  console.log(`[icons] wrote subset: ${usedNames.size} icons, ${sorted.length} glyphs, ${(woff.length / 1024).toFixed(1)} KB woff`)
}

main().catch((err) => {
  // Never block dev/build: the committed subset files keep working.
  console.warn('[icons] subset generation skipped:', err?.message || err)
})
