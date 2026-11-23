// Home page only: get the server-rendered page on screen as early as possible.
// Other pages are returned exactly as Nuxt renders them.
export default defineNitroPlugin((nitroApp) => {
  const entryTag = /<script type="module" src="([^"]+)" crossorigin><\/script>/
  const chunkCssTag = /<link rel="stylesheet" href="(\/_nuxt\/[^"]+\.css)" crossorigin>/g

  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const path = (event.path || '').split('?')[0]
    if (path !== '/') return

    html.head = html.head.map((chunk) =>
      chunk
        // 1. Chunk stylesheets no longer block the first paint.
        //    Nuxt already inlines the CSS of every server-rendered component into the
        //    page (features.inlineStyles, on by default), so these files only repeat
        //    it, plus a few rules for content inside the closed modals. Each one cost
        //    an extra connection before anything could be drawn. They still load, in
        //    the same position in the cascade, a moment later.
        //    (If inlineStyles is ever turned off, remove this replace.)
        .replace(chunkCssTag, `<link rel="stylesheet" href="$1" crossorigin media="print" onload="this.media='all'">`)
        // 2. Paint before the Nuxt app boots.
        //    Nuxt emits its entry as <script type="module" src="/_nuxt/xxx.js">. On a
        //    fast connection the browser runs it (creating the Vue app and hydrating,
        //    ~0.5 s on a phone) before it has drawn anything. Here the same file is
        //    started right after the first frame is drawn; it is still downloaded
        //    early through Nuxt's <link rel="modulepreload">.
        .replace(entryTag, (_tag, src) => {
          const url = JSON.stringify(src)
          // requestAnimationFrame + setTimeout runs just after the next frame is painted.
          // The 2 s timer is a fallback for background tabs, where no frames are produced.
          return `<script type="module">(function(){var started=false;function start(){if(started)return;started=true;import(${url});}requestAnimationFrame(function(){setTimeout(start,0);});setTimeout(start,2000);})();</script>`
        }),
    )
  })
})
