import type { Inject } from '@nuxt/types/app'

export default function ({ store }: { store: any }, inject: Inject) {
  inject('isLogged', () => store.state.user.id !== -1)
  inject('isAdmin', () => store.state.user.role === 'admin')
  inject('shouldWatchBanners', () => store.state.user.role === 'basic')
}
