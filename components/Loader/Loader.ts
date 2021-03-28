import { Vue, Component } from 'nuxt-property-decorator'

@Component({})

export default class Loader extends Vue {
  loading = false

  start (): void {
    this.loading = true
    this.$store.commit('setModalVisibility', true)
  }

  finish (): void {
    this.loading = false
    this.$store.commit('setModalVisibility', false)
  }
}
