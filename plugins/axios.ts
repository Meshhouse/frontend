import type { Inject } from '@nuxt/types/app'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({ $axios, isDev }: { $axios: NuxtAxiosInstance, isDev: boolean }, inject: Inject) {
  const baseUrl = isDev ? 'http://strapi:1337' : 'https://api.meshhouse.art'
  const baseUrlBrowser = isDev ? 'http://localhost:1337' : 'https://api.meshhouse.art'
  const strapi = $axios.create({})
  const strapiBrowser = $axios.create({})

  strapi.setBaseURL(baseUrl)
  strapiBrowser.setBaseURL(baseUrlBrowser)

  inject('strapi', strapi)
  inject('strapiBrowser', strapiBrowser)
}
