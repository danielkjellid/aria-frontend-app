/* eslint-disable @typescript-eslint/no-unused-vars */
import { $fetch } from 'ohmyfetch'
import { Setter } from './types'

const baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8000/api/'
    : 'https://api.staging.flis.no/api/'

export const apiService = $fetch.create({
  baseURL,
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
  if (!url) {
    throw new Error('Url was not provided.')
  }

  const response = await apiService(url, {
    ...options,
    headers: {
      Authorization: process.client ? `Bearer ${localStorage.getItem('access_token')}` : null,
      ...options.headers,
    },
  })

  if (!response.ok) {
    // do stuff
  }

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
