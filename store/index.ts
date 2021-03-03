export function state () {
  return {
    error: {
      visible: false,
      message: ''
    },
    categories: [],
    theme: 'light',
    modalVisible: false
  }
}

export const mutations = {
  setTheme (state: any, payload: string) {
    state.theme = payload
  },
  setCategories (state: any, payload: any[]) {
    state.categories = payload
  },
  setModalVisibility (state: any, payload: boolean) {
    state.modalVisible = payload
  }
}

export const actions = {
  // eslint-disable-next-line require-await
  async nuxtServerInit ({ commit }: { commit: Function }) {
    try {
      const theme = (this as any).$cookies.get('theme')
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
    } catch (err) {
      console.log(err)
    }
  }
}
