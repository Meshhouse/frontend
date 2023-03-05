import type { Inject } from '@nuxt/types/app'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, clearAuthTokens } from 'axios-jwt'
import { generateAuthHeader } from '@/functions/axios'

export default function ({ $axios, app, error: nuxtError }: { $axios: NuxtAxiosInstance, app: any, error: any }, inject: Inject) {
  const baseBrowserUrl = process.env.BROWSER_API_URL || ''
  const baseUrl = process.env.SSR_API_URL || ''
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

  axiosInstance.setHeader('x-meshhouse-language', app.i18n.locale)

  app.i18n.onLanguageSwitched = (_oldLocale: string, newLocale: string) => {
    axiosInstance.setHeader('x-meshhouse-language', newLocale)

    app.store.dispatch('updateServerInit')
  }

  const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    if (refreshToken) {
      try {
        const response = await $axios.post(`${process.env.BROWSER_API_URL}/refresh`, { refresh_token: refreshToken })

        return {
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token
        }
      } catch (error) {
        clearAuthTokens()
        return ''
      }
    }

    return ''
  }

  if (process.client) {
    applyAuthTokenInterceptor(axiosInstance, { requestRefresh })
  }

  axiosInstance.onResponseError((err) => {
    if (err.isAxiosError && err.response?.status !== 503) {
      return Promise.reject(err)
    } else {
      nuxtError({
        statusCode: 503,
        message: 'Maintenance mode'
      })

      return Promise.resolve()
    }
  })

  inject('api', axiosInstance)
  inject('generateAuthHeader', generateAuthHeader)
}
