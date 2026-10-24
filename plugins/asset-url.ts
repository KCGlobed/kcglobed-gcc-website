import { joinURL, withTrailingSlash } from 'ufo'

// Builds public asset URLs (Cloudflare R2).
// `media/...` paths -> NUXT_PUBLIC_MEDIA_BASE_URL (falls back to the asset base when unset),
// everything else (`static/...`) -> NUXT_PUBLIC_ASSET_BASE_URL.
// Usage: template `$asset('static/images/x.png')`, script `useNuxtApp().$asset(...)`.
export default defineNuxtPlugin(() => {
  const { assetBaseUrl, mediaBaseUrl, assetFallbackUrl } = useRuntimeConfig().public

  // When an <img>/<video>/<source> from assetBaseUrl fails to load, retry it once from
  // NUXT_PUBLIC_ASSET_FALLBACK_URL. Inline in <head> so it also catches SSR-rendered tags
  // that fail before the app hydrates.
  if (assetBaseUrl && assetFallbackUrl) {
    const from = JSON.stringify(withTrailingSlash(assetBaseUrl))
    const to = JSON.stringify(withTrailingSlash(assetFallbackUrl))
    useHead({
      script: [{
        key: 'asset-fallback',
        tagPosition: 'head',
        innerHTML: `(function(p,f){document.addEventListener('error',function(e){var t=e.target,n=t&&t.tagName;if(n!=='IMG'&&n!=='VIDEO'&&n!=='SOURCE')return;var s=t.getAttribute('src');if(!s||s.indexOf(p)!==0)return;t.setAttribute('src',f+s.slice(p.length));if(n==='SOURCE'&&t.parentNode&&t.parentNode.load)t.parentNode.load();},true);})(${from},${to});`,
      }],
    })
  }

  return {
    provide: {
      asset: (path: string) => {
        const isMedia = path.replace(/^\/+/, '').startsWith('media/')
        return joinURL(isMedia && mediaBaseUrl ? mediaBaseUrl : assetBaseUrl, path)
      },
    },
  }
})
