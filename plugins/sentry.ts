import * as Sentry from '@sentry/vue'

import { BrowserTracing } from '@sentry/tracing'

export default defineNuxtPlugin((nuxtApp) => {
  const dsn = nuxtApp.$config.SENTRY_DSN
  const environment = nuxtApp.$config.ENVIRONMENT

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
        tracingOrigins: ['localhost', 'flis.no', /^\//],
      }),
    ],
    environment,
    enabled: environment === 'production' || environment === 'staging',
    sampleRate: 1,
    tracesSampleRate: 1,
  })
})
