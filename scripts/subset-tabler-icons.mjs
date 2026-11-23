// Generates a small Tabler Icons build containing only the icons this project uses.
//
// The full icon set is ~760 KB (woff2) + ~260 KB of CSS, which was loaded on every
// page. This script scans the source for `ti-*` class names and writes:
//   assets/fonts/tabler-icons-subset.css
//   assets/fonts/tabler-icons-subset.woff2
//
// It runs automatically before `npm run dev` / `npm run build`, so a newly used
// icon is picked up without any manual step. Run it by hand with:
//   npm run icons:subset
//
// Safety net: the generated CSS still declares the full font as a fallback face,
// so a glyph that is not in the subset is fetched from the full font on demand.

import { readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

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
    const src = await readFile(file, 'utf8')
    for (const m of src.matchAll(/\bti-([a-z0-9]+(?:-[a-z0-9]+)*)/g)) {
      if (iconMap.has(m[1])) usedNames.add(m[1])
    }
    // Glyphs referenced directly in stylesheets (content: "\ea1f" or the raw character).
    for (const m of src.matchAll(/\\(e[a-f][0-9a-f]{2}|f[0-9a-f]{3})\b/gi)) codepoints.add(parseInt(m[1], 16))
    for (const ch of src) {
      const cp = ch.codePointAt(0)
      if (cp >= 0xea00 && cp <= 0xffff) codepoints.add(cp)
    }
  }
  for (const name of usedNames) codepoints.add(parseInt(iconMap.get(name), 16))

  const sorted = [...codepoints].sort((a, b) => a - b)
  const text = sorted.map((cp) => String.fromCodePoint(cp)).join('')

  // The font itself is subset with the optional "subset-font" dev dependency.
  // Without it only the CSS is trimmed and icons keep using the full font file.
  let woff2 = null
  try {
    const { default: subsetFont } = await import('subset-font')
    const fullFont = await readFile(join(fontsDir, 'tabler-icons.ttf'))
    woff2 = await subsetFont(fullFont, text, { targetFormat: 'woff2' })
  } catch (err) {
    console.warn('[icons] "subset-font" is not installed (npm i -D subset-font) - trimming CSS only, keeping the full icon font')
  }

  const unicodeRange = sorted.map((cp) => `U+${cp.toString(16).toUpperCase()}`).join(',')
  const rules = [...usedNames].sort().map((n) => `.ti-${n}:before{content:"\\${iconMap.get(n)}"}`).join('\n')

  const subsetFace = woff2
    ? `/* Subset font: declared last so it wins for every glyph in its unicode-range. */
@font-face {
  font-family: "tabler-icons";
  font-style: normal;
  font-weight: 400;
  src: url("./tabler-icons-subset.woff2") format("woff2");
  unicode-range: ${unicodeRange};
}
`
    : ''

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
}
${subsetFace}.ti {
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
  const fontPath = join(fontsDir, 'tabler-icons-subset.woff2')
  const prevCss = existsSync(cssPath) ? await readFile(cssPath, 'utf8') : ''
  // Skip rewriting when nothing changed so dev/build runs do not dirty the git tree.
  if (prevCss === css && (!woff2 || existsSync(fontPath))) {
    console.log(`[icons] subset up to date (${usedNames.size} icons)`)
    return
  }
  if (woff2) await writeFile(fontPath, woff2)
  await writeFile(cssPath, css)
  console.log(`[icons] wrote subset: ${usedNames.size} icons, ${sorted.length} glyphs` + (woff2 ? `, ${(woff2.length / 1024).toFixed(1)} KB woff2` : ' (CSS only)'))
}

main().catch((err) => {
  // Never block dev/build: the committed subset files keep working.
  console.warn('[icons] subset generation skipped:', err?.message || err)
})
