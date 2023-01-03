import { ActionTree, MutationTree } from 'vuex'
import type {
  User,
  License,
  Category,
  CategoryFilter,
  SitePatron,
  SiteSupporter
} from '@meshhouse/types'
import { NuxtApp } from '@nuxt/types/app'
import { recursiveFindObject } from '@/functions/helpers'
import type {
  CategoryTreeItem,
  Notification
} from '@/types'


type ApplicationStore = {
  error: {
    visible: boolean;
    message: string;
  };
  supporters: SitePatron[];
  topSupporters: SiteSupporter[];
  categories: CategoryTreeItem[];
  licenses: License[];
  favorites: number[];
  theme: 'light' | 'dark';
  modalVisible: boolean,
  user: User,
  notifications: Notification[]
  categoryFilters: CategoryFilter[]
}

export const state = (): ApplicationStore => ({
  error: {
    visible: false,
    message: ''
  },
  supporters: [],
  topSupporters: [],
  categories: [],
  licenses: [],
  favorites: [],
  theme: 'light',
  modalVisible: false,
  user: {
    id: -1,
    name: '',
    email: '',
    role: 'basic',
    created_at: '',
    updated_at: '',
    subscriptions: []
  },
  notifications: [],
  categoryFilters: []
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setTheme: (state: ApplicationStore, payload: 'light' | 'dark') => {
    state.theme = payload
  },
  setCategories: (state: ApplicationStore, payload: CategoryTreeItem[]) => {
    state.categories = payload
  },
  setLicenses: (state: ApplicationStore, payload: License[]) => {
    state.licenses = payload
  },
  setFavorites: (state: ApplicationStore, payload: number[]) => {
    state.favorites = payload
  },
  changeFavorite: (state: ApplicationStore, id: number) => {
    const favorite = state.favorites.findIndex((item: number) => item === id)
    if (favorite === -1) {
      state.favorites.push(id)
    } else {
      state.favorites.splice(favorite, 1)
    }
  },
  setModalVisibility: (state: ApplicationStore, payload: boolean) => {
    state.modalVisible = payload
  },
  setUser: (state: ApplicationStore, payload: User) => {
    state.user = payload
  },
  setPatronSupporters: (state: ApplicationStore, payload: SitePatron[]) => {
    state.supporters = payload
  },
  setPatronTopSupporters: (state: ApplicationStore, payload: SiteSupporter[]) => {
    state.topSupporters = payload
  },
  addNotification: (state: ApplicationStore, payload: Notification) => {
    state.notifications.push(payload)
  },
  removeNotification: (state: ApplicationStore, idx: number) => {
    state.notifications.splice(idx, 1)
  },
  setSharedCategoryFilters: (state: ApplicationStore, payload: CategoryFilter[]) => {
    state.categoryFilters = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  findCategoryBySlug ({ state }: { state: ApplicationStore }, slug: string) {
    return recursiveFindObject<Category>(state.categories, 'slug', 'childrens', slug)
  },
  addNotification ({ state, commit }: { state: ApplicationStore, commit: Function }, payload: Notification) {
    commit('addNotification', payload)

    if (payload.timeout) {
      const idx = state.notifications.length - 1
      setTimeout(() => commit('removeNotification', idx), payload.timeout)
    }
  },
  changeFavorite ({ commit, state }, id) {
    commit('changeFavorite', id)

    this.$cookies.set('favorites', state.favorites, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax'
    })
  },
  async updateServerInit ({ commit }) {
    const responses = await Promise.all([
      (this as any).$api({
        method: 'GET',
        url: 'category-tree',
        headers: (this as any).$generateAuthHeader('category-tree', 'GET')
      }),
      (this as any).$api({
        method: 'GET',
        url: 'licenses',
        headers: (this as any).$generateAuthHeader('licenses', 'GET')
      }),
      (this as any).$api({
        method: 'GET',
        url: 'blocks/site_patrons',
        headers: (this as any).$generateAuthHeader('blocks/site_patrons', 'GET')
      }),
      (this as any).$api({
        method: 'GET',
        url: 'blocks/site_supporters',
        headers: (this as any).$generateAuthHeader('blocks/site_supporters', 'GET')
      }),
      (this as any).$api({
        method: 'GET',
        url: 'categories/null/filters',
        headers: (this as any).$generateAuthHeader('categories/null/filters', 'GET')
      })
    ])

    commit('setCategories', responses[0].data)
    commit('setLicenses', responses[1].data)
    commit('setPatronSupporters', responses[2]?.data?.content ?? [])
    commit('setPatronTopSupporters', responses[3]?.data?.content ?? [])
    commit('setSharedCategoryFilters', responses[4]?.data ?? [])
  },
  async nuxtServerInit ({ commit, dispatch }, context: NuxtApp) {
    try {
      const theme = context.$cookies.get('theme')
      const favorites = context.$cookies.get('favorites')

      try {
        await dispatch('updateServerInit')
      } catch {}

      if (theme) {
        commit('setTheme', theme)
      }
      if (favorites) {
        commit('setFavorites', favorites)
      }
    } catch (err) {
      context.$sentry.captureException(err)
      console.error(err)
    }
  }
}
