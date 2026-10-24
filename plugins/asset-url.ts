import { joinURL } from 'ufo'

// Builds public asset URLs (Cloudflare R2) from NUXT_PUBLIC_ASSET_BASE_URL.
// Usage: template `$asset('static/images/x.png')`, script `useNuxtApp().$asset(...)`.
export default defineNuxtPlugin(() => {
  const base = useRuntimeConfig().public.assetBaseUrl as string

  return {
    provide: {
      asset: (path: string) => joinURL(base, path),
    },
  }
})
