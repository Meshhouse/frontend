import { Middleware } from '@nuxt/types'

const auth: Middleware = (context) => {
  const session = context.$cookies.get('adonis-session')
  const logged = context.$cookies.get('logged')

  if (context.store.state.user.id === -1 || !session || !logged) {
    return context.redirect(context.app.localePath('/'))
  }
}

export default auth
