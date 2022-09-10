import { defineNuxtConfig } from 'nuxt'
import fetchDynamicRoutes from './utils/fetchDynamicRoutes'

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

  modules: ['@pinia/nuxt', '@funken-studio/sitemap-nuxt-3'],

  sitemap: {
    hostname: 'https://flis.no',
    cacheTime: 1,
    routes: fetchDynamicRoutes,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString(),
    },
  },

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
