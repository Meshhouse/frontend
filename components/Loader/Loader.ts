import { Vue, Component } from 'nuxt-property-decorator'

@Component({})

export default class Loader extends Vue {
  loading = false
  init = false

  mounted () {
    if ((window.$nuxt as any)._isMounted) {
      this.init = true
    }

    (window as any).onNuxtReady(() => {
      this.init = true
    })
  }

  start (): void {
    this.loading = true
    this.$store.commit('setModalVisibility', true)
  }

  finish (): void {
    this.loading = false
    this.$store.commit('setModalVisibility', false)
  }
}
