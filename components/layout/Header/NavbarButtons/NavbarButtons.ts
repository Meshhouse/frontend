import { Vue, Component, Watch } from 'nuxt-property-decorator'
import UserBox from '@/components/layout/Header/UserBox/UserBox.vue'
@Component({
  components: {
    UserBox
  }
})

export default class NavbarButtons extends Vue {
  favoritesCount: number = this.$store.state.favorites.length

  @Watch('$store.state.favorites')
  updateFavoritesCount (): void {
    this.favoritesCount = this.$store.state.favorites.length
  }

  get favoritesString (): string {
    return this.favoritesCount >= 1000 ? '999+' : this.favoritesCount.toString()
  }
}
