import { Setter } from './types'

export async function getter<T>(url: string, options: any = {}): Promise<T> {
  const nuxtApp = useNuxtApp()

  if (!url) {
    throw new Error('Url was not provided.')
  }

  const response = await nuxtApp.$apiService(url, {
    ...options,
    headers: {
      Authorization: process.client ? `Bearer ${localStorage.getItem('access_token')}` : null,
      ...options.headers,
    },
  })

  return response
}

export const setter =
  (method: string): Setter =>
  <T>(url: string, data: unknown, options: any = {}) => {
    const payload = JSON.stringify(data)

    return getter<T>(url, {
      body: payload,
      method,
      ...options,
      headers: {
        ...options.headers,
      },
    })
  }
