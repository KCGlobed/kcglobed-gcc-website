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
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/]
    },
    // workbox: {
    //   globPatterns: ['**/*.{js,css,html,ico,png,svg}'],

    //   runtimeCaching: [
    //     {
    //       urlPattern: /^https:\/\/your-api-domain\.com\/.*/i,
    //       handler: 'NetworkFirst',
    //       options: {
    //         cacheName: 'api-cache',
    //         expiration: {
    //           maxEntries: 50,
    //           maxAgeSeconds: 60 * 60 * 24 // 1 day
    //         }
    //       }
    //     }
    //   ]
    // }
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


