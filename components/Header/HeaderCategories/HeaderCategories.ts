import { Vue, Component } from 'nuxt-property-decorator'

@Component({})

export default class HeaderCategories extends Vue {
  toggled = false

  active: string | null = null

  toggle (): void {
    this.toggled = !this.toggled
    this.$store.commit('setModalVisibility', !this.$store.state.modalVisible)
  }

  setActiveTab (slug: string): void {
    this.active = slug
  }

  get categories (): any[] {
    return this.$store.state.categories
  }

  get rootCategories (): any[] {
    return this.categories.filter((item: any) => item.parent_category === null)
  }

  getNestedCategories (parent: any): any[] {
    return this.categories.filter((item: any) => {
      return item.parent_category !== null && item.parent_category.id === parent.id
    })
  }
}
