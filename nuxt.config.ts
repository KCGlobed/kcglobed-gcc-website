// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    // baseURL: "/tuva/",
    head: {
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
    output: {
      dir: "dist",
      serverDir: "dist/server",
    },
  },
});


