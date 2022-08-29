/* eslint-disable @typescript-eslint/no-unused-vars */
import { $fetch } from 'ohmyfetch'
import { Setter } from './types'

export const apiService = $fetch.create({
  // baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  async onRequestError({ request, options, error }) {
    await console.log('[fetch request error]', request, error)
  },
  async onResponseError({ request, response, options }) {
    await console.log('[fetch response error]', request, response.status, response.body)
  },
})

export async function getter<T>(url: string, options: any = {}): Promise<T> {
  const config = useRuntimeConfig().public

  if (!url) {
    throw new Error('Url was not provided.')
  }

  const response = await apiService(`${config.BASE_URL}${url}`, {
    ...options,
    headers: {
      Authorization: process.client ? `Bearer ${localStorage.getItem('access_token')}` : null,
      ...options.headers,
    },
  })

  if (!response.ok) {
    // do stuff.
  }

  return response
}

export const setter =
  (method: string): Setter =>
  <T>(url: string, data: unknown, options: any = {}) => {
    const config = useRuntimeConfig().public
    const payload = JSON.stringify(data)

    return getter<T>(`${config.BASE_URL}${url}`, {
      body: payload,
      method,
      ...options,
      headers: {
        ...options.headers,
      },
    })
  }
