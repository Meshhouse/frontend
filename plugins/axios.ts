import type { Inject } from '@nuxt/types/app'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { generateAuthHeader } from '@/functions/axios'

export default function ({ $axios, isDev }: { $axios: NuxtAxiosInstance, isDev: boolean }, inject: Inject) {
  const baseBrowserUrl = isDev ? 'http://localhost:3333/req' : 'https://meshhouse.art/req'
  const baseUrl = isDev ? 'http://backend:3333/req' : 'https://meshhouse.art/req'
  const axiosInstance = $axios.create({})

  if (process.client) {
    axiosInstance.setBaseURL(baseBrowserUrl)
  }

  if (process.server) {
    axiosInstance.setBaseURL(baseUrl)
    axiosInstance.setHeader('user-agent', 'Meshhouse SSR 1.0')
  }

  axiosInstance.onRequest((config) => {
    config.withCredentials = true
  })

  inject('api', axiosInstance)
  inject('generateAuthHeader', generateAuthHeader)
}
