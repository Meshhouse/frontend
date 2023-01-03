import { Vue, Component } from 'nuxt-property-decorator'
import type {
  CategoryTreeItem
} from '@/types'

@Component({})

export default class HeaderCategories extends Vue {
  toggled = false

  active: string | null = null

  toggle (): void {
    this.toggled = !this.toggled
    this.$store.commit('setModalVisibility', !this.$store.state.modalVisible)
  }

  navigate (path: string): void {
    this.toggle()
    this.$router.push(this.localePath(path))
  }

  setActiveTab (slug: string): void {
    this.active = slug
  }

  get categories (): CategoryTreeItem[] {
    return this.$store.state.categories
  }

  get rootCategories (): CategoryTreeItem[] {
    return this.categories.filter(item => item.parent_id === null)
  }
}
