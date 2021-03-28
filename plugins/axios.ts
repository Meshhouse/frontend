import type { Inject } from '@nuxt/types/app'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({ $axios, isDev }: { $axios: NuxtAxiosInstance, isDev: boolean }, inject: Inject) {
  const baseBrowserUrl = isDev ? 'http://localhost:1337' : 'https://api.meshhouse.art'
  const baseUrl = isDev ? 'http://strapi:1337' : 'https://api.meshhouse.art'
  const strapi = $axios.create({})

  if (process.client) {
    strapi.setBaseURL(baseBrowserUrl)
  }
  if (process.server) {
    strapi.setBaseURL(baseUrl)
  }

  inject('strapi', strapi)
}
