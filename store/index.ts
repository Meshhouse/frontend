import { ActionTree, MutationTree } from 'vuex'
import { uid } from 'uid'
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
  categoryFilters: CategoryFilter[],
  uid: string
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
  categoryFilters: [],
  uid: ''
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
  },
  setUid: (state: ApplicationStore, id: string) => {
    state.uid = id
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
  generateUniqueId ({ commit }) {
    const cookieId = this.$cookies.get('uid')
    const localStorageId = window.localStorage.getItem('uid')

    if (!cookieId && !localStorageId) {
      const id = uid(64)
      this.$cookies.set('uid', id, {
        maxAge: 30 * 24 * 60 * 183,
        path: '/',
        sameSite: 'lax'
      })
      window.localStorage.setItem('uid', id)
      commit('setUid', id)
    } else {
      if (cookieId) {
        window.localStorage.setItem('uid', cookieId)
      } else if (localStorageId) {
        this.$cookies.set('uid', localStorageId, {
          maxAge: 30 * 24 * 60 * 183,
          path: '/',
          sameSite: 'lax'
        })
      }

      commit('setUid', cookieId || localStorageId)
    }
  },
  async viewModelEvent ({ state }, { id }: { id: number }) {
    try {
      await this.$api({
        method: 'PUT',
        url: 'statistics/models/view',
        data: {
          model_id: id,
          uid: state.uid
        },
        headers: this.$generateAuthHeader('statistics/models/view', 'PUT')
      })
    } catch (error) {}
  },
  async likeModelEvent ({ state }, { id }: { id: number }) {
    try {
      await this.$api({
        method: 'PUT',
        url: 'statistics/models/like',
        data: {
          model_id: id,
          uid: state.uid
        },
        headers: this.$generateAuthHeader('statistics/models/like', 'PUT')
      })
    } catch (error) {}
  },
  async downloadModelEvent ({ state }, { id, fileId }: { id: number, fileId: number }) {
    try {
      await this.$api({
        method: 'PUT',
        url: 'statistics/models/download',
        data: {
          model_id: id,
          file_id: fileId,
          uid: state.uid
        },
        headers: this.$generateAuthHeader('statistics/models/download', 'PUT')
      })
    } catch (error) {}
  },
  async updateServerInit ({ commit }) {
    const responses = await Promise.all([
      this.$api({
        method: 'GET',
        url: 'category-tree',
        headers: this.$generateAuthHeader('category-tree', 'GET')
      }),
      this.$api({
        method: 'GET',
        url: 'licenses',
        headers: this.$generateAuthHeader('licenses', 'GET')
      }),
      this.$api({
        method: 'GET',
        url: 'blocks/site_patrons',
        headers: this.$generateAuthHeader('blocks/site_patrons', 'GET')
      }),
      this.$api({
        method: 'GET',
        url: 'blocks/site_supporters',
        headers: this.$generateAuthHeader('blocks/site_supporters', 'GET')
      }),
      this.$api({
        method: 'GET',
        url: 'categories/null/filters',
        headers: this.$generateAuthHeader('categories/null/filters', 'GET')
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
      const favorites = context.$cookies.get('favorites')

      try {
        await dispatch('updateServerInit')
      } catch {}

      if (favorites) {
        commit('setFavorites', favorites)
      }
    } catch (err) {
      context.$sentry.captureException(err)
      console.error(err)
    }
  }
}
