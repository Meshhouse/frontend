import { Middleware } from '@nuxt/types'
import { isLoggedIn } from 'axios-jwt'

const auth: Middleware = async (context) => {
  if (process.client && isLoggedIn()) {
    try {
      const profile = (await context.$api({
        method: 'GET',
        url: 'profile',
        headers: context.$generateAuthHeader('profile', 'GET')
      })).data

      context.store.commit('setUser', profile)
    } catch (err) {
      context.$sentry.captureException(err)
      console.error(err)
      return context.redirect(context.app.localePath('/'))
    }
  }
}

export default auth
