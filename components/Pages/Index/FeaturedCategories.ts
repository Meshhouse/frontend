import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type { FeaturedCategory } from '@meshhouse/types'
@Component({})

export default class FeaturedCategories extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly categories!: FeaturedCategory[]

  getUrl (category: FeaturedCategory): string {
    if (category === undefined) {
      return ''
    }
    let baseUrl = '/models/'
    baseUrl += category.category_slug !== '' ? category.category_slug : ''
    baseUrl += category.tag !== '' ? `?tag=${category.tag}` : ''

    return baseUrl
  }
}
