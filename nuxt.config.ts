// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    // baseURL: "/tuva/",
    head: {
      meta: [
        { name: 'google-site-verification', content: 'O_n2cuv-YeR9IgQt1HCNWTCY7aIvfyJfpB59jnIEau0' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-B2ETHYM6MN',
          async: true
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B2ETHYM6MN');`
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/jpg',
          href: '/favicon.jpg', // ya /favicon.ico
        },
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
  modules: ["@bootstrap-vue-next/nuxt", "nuxt-swiper", "nuxt-aos"],
  runtimeConfig: {
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
    razorpayCurrency: process.env.RAZORPAY_CURRENCY || 'INR',
    razorpayAmount: process.env.RAZORPAY_PAYMENT_AMOUNT || '2950',
    public: {
      paymentAmount: process.env.PAYMENT_AMOUNT
    }
  },
  plugins: ["~/plugins/scrollReveal.ts"],
  aos: {
    duration: 1000,
    once: true,
  },
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    output: {
      dir: "dist",
      serverDir: "dist/server",
    },
  },
});


