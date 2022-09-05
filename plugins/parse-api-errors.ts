/* eslint-disable arrow-body-style */

interface ApiErrorExtra {
  [x: string]: string
}

interface ApiError {
  message: string
  extra?: ApiErrorExtra
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      parseApiError: (field: string, error: ApiError) => {
        if (error && error.extra) {
          return error.extra[field] ? error.extra[field] : null
        }

        return null
      },
    },
  }
})
