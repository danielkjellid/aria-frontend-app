/* eslint-disable @typescript-eslint/no-unused-vars */
import { $fetch } from 'ohmyfetch'

export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = nuxtApp.$config.BASE_URL

  return {
    provide: {
      apiService: $fetch.create({
        baseURL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: process.client ? `Bearer ${localStorage.getItem('access_token')}` : null,
        },
        async onRequestError({ request, options, error }) {
          await showError({ statusCode: 500 })
        },
        async onResponseError({ request, response, options }) {
          await showError({ statusCode: response.status, statusMessage: response.statusText })
        },
      }),
    },
  }
})
