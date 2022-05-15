import { recursiveFindObject } from '@/functions/helpers'

import type {
  Category,
  CategoryFilter,
  CategoryTreeItem
} from '@/types/api/categories'

import type {
  License
} from '@/types/api/licenses'

import type {
  User
} from '@/types/api/users'

import type {
  SitePatron,
  SiteSupporter
} from '@/types/api/blocks'

import type {
  Notification
} from '@/types'

import { NuxtApp } from '@nuxt/types/app'

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

export function state (): ApplicationStore {
  return {
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
      remember_me_token: null,
      role: 'basic',
      created_at: '',
      updated_at: ''
    },
    notifications: [],
    categoryFilters: []
  }
}

export const mutations = {
  setTheme (state: ApplicationStore, payload: 'light' | 'dark') {
    state.theme = payload
  },
  setCategories (state: ApplicationStore, payload: CategoryTreeItem[]) {
    state.categories = payload
  },
  setLicenses (state: ApplicationStore, payload: License[]) {
    state.licenses = payload
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
  },
  setUser (state: ApplicationStore, payload: User) {
    state.user = payload
  },
  setPatronSupporters (state: ApplicationStore, payload: SitePatron[]) {
    state.supporters = payload
  },
  setPatronTopSupporters (state: ApplicationStore, payload: SiteSupporter[]) {
    state.topSupporters = payload
  },
  addNotification (state: ApplicationStore, payload: Notification) {
    state.notifications.push(payload)
  },
  removeNotification (state: ApplicationStore, idx: number) {
    state.notifications.splice(idx, 1)
  },
  setSharedCategoryFilters (state: ApplicationStore, payload: CategoryFilter[]) {
    state.categoryFilters = payload
  }
}

export const actions = {
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
  async nuxtServerInit ({ commit }: { commit: Function }, context: NuxtApp) {
    try {
      const theme = context.$cookies.get('theme')
      const favorites = context.$cookies.get('favorites')
      const session = context.$cookies.get('adonis-session')
      const logged = context.$cookies.get('logged')

      const responses = await Promise.all([
        context.$api({
          method: 'GET',
          url: 'category-tree',
          headers: context.$generateAuthHeader('category-tree', 'GET')
        }),
        context.$api({
          method: 'GET',
          url: 'licenses',
          headers: context.$generateAuthHeader('licenses', 'GET')
        }),
        context.$api({
          method: 'GET',
          url: 'blocks/site_patrons',
          headers: context.$generateAuthHeader('blocks/site_patrons', 'GET')
        }),
        context.$api({
          method: 'GET',
          url: 'blocks/site_supporters',
          headers: context.$generateAuthHeader('blocks/site_supporters', 'GET')
        }),
        context.$api({
          method: 'GET',
          url: 'categories/null/filters',
          headers: context.$generateAuthHeader('categories/null/filters', 'GET')
        })
      ])

      if (session && logged) {
        try {
          const profile = (await context.$api({
            method: 'GET',
            url: 'profile',
            headers: context.$generateAuthHeader('profile', 'GET')
          })).data

          commit('setUser', profile)
        } catch (err) {
          console.error(err)
        }
      }

      if (theme) {
        commit('setTheme', theme)
      }
      if (favorites) {
        commit('setFavorites', favorites)
      }

      commit('setCategories', responses[0].data)
      commit('setLicenses', responses[1].data)
      commit('setPatronSupporters', responses[2]?.data?.content ?? [])
      commit('setPatronTopSupporters', responses[3]?.data?.content ?? [])
      commit('setSharedCategoryFilters', responses[4]?.data ?? [])
    } catch (err) {
      console.log(err)
    }
  }
}
