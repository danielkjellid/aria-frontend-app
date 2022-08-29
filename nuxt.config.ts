import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      SENTRY_DSN: process.env.SENTRY_DSN,
      ENVIRONMENT: process.env.ENVIRONMENT,

      BASE_URL: process.env.BASE_URL,
      BRAND_NAME: process.env.BRAND_NAME,
      LEGAL_NAME: process.env.LEGAL_NAME,

      CONTACT_LINK: process.env.CONTACT_LINK,
      FACEBOOK_LINK: process.env.FACEBOOK_LINK,
      INSTAGRAM_LINK: process.env.INSTAGRAM_LINK,
    },
  },

  meta: {
    title: 'FK JKE Design',
    titleTemplate: '%s - FK JKE Design',
    htmlAttrs: {
      lang: 'no',
    },
  },

  dev: process.env.NODE_ENV !== 'production',

  dir: {
    pages: 'views',
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/calendar.css',
    '@vuepic/vue-datepicker/dist/main.css',
  ],

  modules: ['@pinia/nuxt'],

  build: {
    transpile: ['@heroicons/vue', 'luxon'],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
})
