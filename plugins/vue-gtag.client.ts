import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    isEnabled:
      process.client && localStorage.getItem('userHasGivenCookieConsent') !== undefined
        ? JSON.parse(localStorage.getItem('userHasGivenCookieConsent'))
        : false,
    property: {
      id: 'UA-179947262-1',
    },
    useDebugger: false,
  })

  trackRouter(nuxtApp.$router)
})
