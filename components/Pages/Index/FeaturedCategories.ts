import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type { StrapiFeaturedCategory } from '@/types'
@Component({})

export default class FeaturedCategories extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly categories!: StrapiFeaturedCategory[]

  getUrl (category: StrapiFeaturedCategory): string {
    if (category === undefined) {
      return ''
    }
    let baseUrl = '/models/'
    baseUrl += category.category !== null ? category.category.slug : 'all'
    baseUrl += category.tag !== null && category.tag !== '' ? `?tag=${category.tag}` : ''

    return baseUrl
  }

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }
}
