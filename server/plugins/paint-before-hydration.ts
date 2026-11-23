// Home page only: get the server-rendered page on screen as early as possible and
// keep the phone's CPU free while it loads.
// Other pages are returned exactly as Nuxt renders them.
//
// To switch this off completely, delete this file - nothing else depends on it.

// When the Nuxt app is started if the visitor does nothing (ms after the load event).
const IDLE_START_DELAY = 4000

// Runs in the browser in place of Nuxt's <script type="module" src="/_nuxt/entry.js">.
// __ENTRY__ is replaced with that same entry URL.
const bootScript = `(function(w,d){
  var started=false,ready=false,pendingTarget=null;
  var events=['pointerdown','touchstart','keydown','scroll','wheel','mousemove'];
  var opts={passive:true,capture:true};
  function start(){
    if(started)return;started=true;
    events.forEach(function(e){w.removeEventListener(e,start,opts);});
    // Switch on the deferred chunk stylesheets (see 1. below) before the app runs.
    var links=d.querySelectorAll('link[data-deferred-css]');
    for(var i=0;i<links.length;i++)links[i].media='all';
    import(__ENTRY__).then(waitUntilHydrated);
  }
  // A tap that lands before the app is interactive is remembered and repeated once
  // the app is ready, so the first tap on "Apply Now", the menu, etc. is not lost.
  function onClick(e){
    if(ready)return;
    var t=e.target;
    if(!t||!t.closest)return;
    var link=t.closest('a[href]');
    var href=link&&link.getAttribute('href');
    // Real links navigate on their own; form controls and videos act natively.
    if(href&&href.charAt(0)!=='#'&&href.indexOf('javascript:')!==0)return;
    if(t.closest('input,textarea,select,label,video,audio'))return;
    pendingTarget=t;
    start();
  }
  function waitUntilHydrated(){
    var tries=0;
    var timer=setInterval(function(){
      var root=d.getElementById('__nuxt');
      var app=root&&root.__vue_app__;
      var nuxt=app&&app.config&&app.config.globalProperties&&app.config.globalProperties.$nuxt;
      if((nuxt&&nuxt.isHydrating===false)||++tries>200){
        clearInterval(timer);
        // Give the Bootstrap plugin (loaded by the app) a moment to attach as well.
        setTimeout(function(){
          ready=true;
          d.removeEventListener('click',onClick,true);
          var t=pendingTarget;pendingTarget=null;
          if(t&&t.isConnected)t.click();
        },300);
      }
    },50);
  }
  events.forEach(function(e){w.addEventListener(e,start,opts);});
  d.addEventListener('click',onClick,true);
  function arm(){setTimeout(start,${IDLE_START_DELAY});}
  if(d.readyState==='complete')arm();else w.addEventListener('load',arm);
})(window,document);`

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
        //    an extra connection before anything could be drawn. They are still
        //    downloaded, and are switched on (same position in the cascade) by the
        //    boot script, right before the app starts.
        //    (If inlineStyles is ever turned off, remove this replace.)
        .replace(chunkCssTag, `<link rel="stylesheet" href="$1" crossorigin media="print" data-deferred-css>`)
        // 2. The Nuxt app starts on the visitor's first interaction (touch, scroll,
        //    key press, mouse move) or IDLE_START_DELAY after the page has loaded,
        //    whichever comes first - instead of during page load.
        //    The page is fully server-rendered, so it looks complete without it;
        //    creating the Vue app and hydrating costs ~0.5 s of CPU on a phone, which
        //    previously either delayed the first paint or froze the page right after.
        //    The entry file is the same one, and it is still downloaded early through
        //    Nuxt's <link rel="modulepreload">, so starting it is immediate.
        .replace(entryTag, (_tag, src) => `<script type="module">${bootScript.replace('__ENTRY__', JSON.stringify(src))}</script>`),
    )
  })
})
