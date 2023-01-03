import { Vue, Component } from 'nuxt-property-decorator'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

import type {
  CategoryTreeItem
} from '@/types'

@Component<HeaderMobileCategories>({
  components: {
    ModalBasic
  }
})
export default class HeaderMobileCategories extends Vue {
  activeCategory: string | null = null

  navigate (path: string): void {
    this.$emit('close')
    this.$router.push(this.localePath(path))
  }

  onReturnBack (): void {
    if (this.activeCategory) {
      this.activeCategory = null
    } else {
      this.$emit('redirect', 'HeaderMobile')
    }
  }

  get categories (): CategoryTreeItem[] {
    return this.$store.state.categories
  }

  get rootCategories (): CategoryTreeItem[] {
    return this.categories.filter(item => item.parent_id === null)
  }

  get activeCategoryObject (): CategoryTreeItem {
    return this.categories.find(category => category.slug === this.activeCategory) || this.categories[0]
  }
}
