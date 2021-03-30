import type { StrapiCategory } from '@/types'

type ApplicationStore = {
  error: {
    visible: boolean;
    message: string;
  };
  categories: StrapiCategory[];
  favorites: number[];
  theme: 'light' | 'dark';
  modalVisible: boolean
}

export function state (): ApplicationStore {
  return {
    error: {
      visible: false,
      message: ''
    },
    categories: [],
    favorites: [],
    theme: 'light',
    modalVisible: false
  }
}

export const mutations = {
  setTheme (state: ApplicationStore, payload: 'light' | 'dark') {
    state.theme = payload
  },
  setCategories (state: ApplicationStore, payload: StrapiCategory[]) {
    state.categories = payload
  },
  setFavorites (state: ApplicationStore, payload: number[]) {
    state.favorites = payload
  },
  changeFavorite (state: ApplicationStore, id: number) {
    const favorite = state.favorites.findIndex((item: number) => item === id)
    if (favorite === -1) {
      state.favorites.push(id)
    } else {
      state.favorites.splice(favorite, 1)
    }
    (this as any).$cookies.set('favorites', state.favorites, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax'
    })
  },
  setModalVisibility (state: ApplicationStore, payload: boolean) {
    state.modalVisible = payload
  }
}

export const actions = {
  // eslint-disable-next-line require-await
  async nuxtServerInit ({ commit }: { commit: Function }) {
    try {
      const theme = (this as any).$cookies.get('theme')
      const favorites = (this as any).$cookies.get('favorites')

      const categories = (await (this as any).$strapi({
        method: 'GET',
        url: '/categories'
      })).data

      if (theme) {
        commit('setTheme', theme)
      }
      if (categories) {
        commit('setCategories', categories)
      }
      if (favorites) {
        commit('setFavorites', favorites)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
