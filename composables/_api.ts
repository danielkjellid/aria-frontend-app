/* eslint-disable @typescript-eslint/no-unused-vars */
import { $fetch } from 'ohmyfetch'
import { Setter } from './types'

const apiService = $fetch.create({
  async onRequestError({ request, options, error }) {
    await showError({ statusCode: 500 })
  },
  async onResponseError({ request, response, options }) {
    if (response.status === 404) {
      await showError({ statusCode: response.status, statusMessage: response.statusText })
    }
  },
})

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept-Language': 'no',
  Accept: 'application/json',
  Authorization: process.client ? `Bearer ${localStorage.getItem('accessToken')}` : null,
}

export async function getter<T>(url: string, options: any = {}): Promise<T> {
  const config = useRuntimeConfig().public
  const baseURL = config.BASE_URL

  if (!baseURL) {
    throw new Error('BASE_URL not defined')
  }

  if (baseURL && baseURL.slice(-1) === '/') {
    throw new Error('BASE_URL cannot end with a trailing /')
  }

  if (!url) {
    throw new Error('Url was not provided.')
  }

  const response = await apiService(`${config.BASE_URL}${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
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
        ...defaultHeaders,
        ...options.headers,
      },
    })
  }
