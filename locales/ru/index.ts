import type { NuxtApp } from '@nuxt/types/app'
import validations from './validations'
import { generateAuthHeader } from '@/functions/axios'

export default async function (context: NuxtApp, locale: string) {
  const url = process.client
    ? `${process.env.BROWSER_API_URL}/localization`
    : `${process.env.SSR_API_URL}/localization`

  const headers = {
    ...generateAuthHeader('localization', 'GET')
  }

  if (process.server) {
    headers['user-agent'] = 'Meshhouse SSR 1.0'
  }

  const response = await context.$axios({
    method: 'GET',
    url,
    params: {
      language: locale
    },
    headers
  })

  return {
    validations,
    ...response.data
  }
}
