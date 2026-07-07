// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-25',
  devtools: { enabled: false },
  app: {
    // baseURL: "/tuva/",
    head: {
      htmlAttrs: {
        lang: 'eng'
      },
      meta: [
        { name: 'google-site-verification', content: 'O_n2cuv-YeR9IgQt1HCNWTCY7aIvfyJfpB59jnIEau0' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/jpg',
          href: '/favicon.jpg',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    layoutTransition: {
      name: "slide",
      mode: "out-in",
    },
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "/assets/fonts/tabler-icons.css",
    "/assets/scss/style.css",
    "/assets/scss/responsive.css",
  ],
  modules: ["@bootstrap-vue-next/nuxt", "nuxt-swiper", "nuxt-aos", '@vite-pwa/nuxt', '@nuxt/image'],
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  pwa: {
    registerType: 'autoUpdate',

    manifest: {
      name: 'GCC Website',
      short_name: 'GCC',
      description: 'GCC Website',
      start_url: '/',
      scope: '/',
      theme_color: '#3d3d3dff',
      background_color: '#393939ff',
      display: 'standalone',
      icons: [
        {
          src: '/pwa_icon_192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa_icon_512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    devOptions: {
      enabled: false,
    },
    // CRITICAL FIX: Ensure the service worker NEVER intercepts API calls.
    // A service worker intercepting fetch requests to the Django backend
    // can cause "Failed to fetch" / CORS errors because the SW context
    // does not have the same origin credentials or CORS handling as the browser.
    workbox: {
      // Do NOT pre-cache anything by default
      globPatterns: [],
      // All external API calls must go directly to the network - never through SW cache
      runtimeCaching: [
        {
          // Match any request to the Django backend API
          urlPattern: ({ url }: { url: URL }) =>
            url.href.includes('run.app') ||
            url.href.includes('gccwebsite') ||
            url.href.includes('api/students') ||
            url.href.includes('api/users'),
          handler: 'NetworkOnly' as const,
        },
        {
          // Also bypass the internal Nuxt server API routes
          urlPattern: ({ url }: { url: URL }) => url.pathname.startsWith('/api/'),
          handler: 'NetworkOnly' as const,
        },
      ],
      // Increase max file size for documents/images uploaded by users
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
    },
  },

  runtimeConfig: {

    // ── Razorpay (disabled – kept for reference) ──────────────────────────────
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
    razorpayCurrency: process.env.RAZORPAY_CURRENCY || 'INR',
    razorpayAmount: process.env.RAZORPAY_PAYMENT_AMOUNT || '2950',
    paymentAmount: process.env.PAYMENT_AMOUNT || '2950',
    // ── Cashfree ──────────────────────────────────────────────────────────────
    cashfreeAppId: process.env.CASH_FREE_APP_ID_PROD,
    cashfreeSecretKey: process.env.CASH_FREE_SECRET_KEY_PROD,
    cashfreeAppIdDev: process.env.CASH_FREE_APP_ID_DEV,
    cashfreeSecretKeyDev: process.env.CASH_FREE_SECRET_KEY_DEV,
    // Set to 'SANDBOX' for test, 'PRODUCTION' for live
    cashfreeEnvironment: process.env.CASHFREE_ENVIRONMENT || 'PRODUCTION',
    cashfreePaymentAmount: process.env.CASHFREE_PAYMENT_AMOUNT || '2950',
    reattemptDiscountPercentage: process.env.REATTEMPT_DISCOUNT_PERCENTAGE || '20',

    // ── Payment Gateway Selector ──────────────────────────────────────────────
    // 'CASHFREE' or 'RAZORPAY'
    paymentGateway: process.env.PAYMENT_GATEWAY || 'CASHFREE',

    // ── Email ─────────────────────────────────────────────────────────────────
    emailHost: process.env.EMAIL_HOST,
    emailUser: process.env.EMAIL_HOST_USER,
    emailPassword: process.env.EMAIL_HOST_PASSWORD,

    // ── PDF ──────────────────────────────────────────────────────
    cpaPdfUrl: process.env.CPA_PDF_URL,
    eaPdfUrl: process.env.EA_PDF_URL,

    // ── SMS (WebInfosys) ──────────────────────────────────────────────────────
    smsApiKey: '',
    smsSenderId: '',
    smsEntityId: '',
    smsTemplateId: '',

    public: {
      paymentGateway: process.env.PAYMENT_GATEWAY || 'CASHFREE',
      paymentAmount: process.env.PAYMENT_AMOUNT || '2950',
      reattemptDiscountPercentage: process.env.REATTEMPT_DISCOUNT_PERCENTAGE || '20',
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      nfetDates: process.env.NUXT_PUBLIC_NFET_DATES || '',
      nfetSlots: process.env.NUXT_PUBLIC_NFET_SLOTS || '',
      nfetSlotBufferHours: process.env.NUXT_PUBLIC_NFET_SLOT_BUFFER_HOURS || '48',
      eaPdfUrl: process.env.EA_PDF_URL || '',
      cpaPdfUrl: process.env.CPA_PDF_URL || '',
    }
  },
  plugins: ["~/plugins/scrollReveal.ts"],
  aos: {
    duration: 1000,
    once: true,
  },
  nitro: {
    preset: 'node-server',
    compressPublicAssets: { gzip: true, brotli: true },
    output: {
      dir: "dist",
      serverDir: "dist/server",
    },
    // Allow large file uploads through the profile proxy without body-size limits
    routeRules: {
      '/api/proxy-profile-update': {
        // Disable automatic body parsing so the raw stream can be forwarded
        // directly to Django. Nitro's default body parser would buffer the
        // entire multipart body into memory — this bypasses it.
        cache: false,
      },
    },
    experimental: {
      // Required to keep the async context alive during streaming proxy calls
      asyncContext: true,
    },
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-bootstrap': ['bootstrap'],
          },
        },
      },
    },
  },
});