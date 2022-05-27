import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Flishuset',
    htmlAttrs: {
      lang: 'no',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=2' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Flishuset er en totalleverandør av markedest mest spennende utvalg innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken fra noen av verdens mest spennende produsenter.',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'robots',
        content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      { property: 'og:url', content: 'https://flis.no' },
      { property: 'og:locale', content: 'nb_NO' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:title',
        content: 'Flishuset: Din totalleverandør av fliser, kjøkken og baderomsinnredning!',
      },
      {
        property: 'og:description',
        content:
          'Flishuset er en totalleverandør av markedest mest spennende utvalg innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken fra noen av verdens mest spennende produsenter.',
      },
      { property: 'og:site_name', content: 'Flishuset' },
      { property: 'twitter:card', content: 'summary' },
      {
        property: 'twitter:description',
        content:
          'Flishuset er en totalleverandør av markedest mest spennende utvalg innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken fra noen av verdens mest spennende produsenter.',
      },
      {
        property: 'twitter:title',
        content: 'Flishuset: Din totalleverandør av fliser, kjøkken og baderomsinnredning!',
      },
      {
        property: 'twitter:image',
        content:
          'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/eternity.jpeg',
      },
    ],
  },

  dev: process.env.NODE_ENV !== 'production',

  dir: {
    pages: 'views',
  },

  buildModules: ['@pinia/nuxt'],

  modules: [
    '@nuxtjs/tailwindcss',
    ['aria-ui-nuxt', { defaultLinkTag: 'router-link', defaultHomePath: '/' }],
  ],

  // modules: [
  //   // @ts-ignore
  //   ["aria-ui-nuxt", { defaultLinkTag: "router-link", defaultHomePath: "/" }],
  // ],

  tailwindcss: {
    viewer: true,
  },
})
