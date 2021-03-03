import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => []
    }
  }
})

export default class FeaturedCategories extends Vue {
  getUrl (category: any): string {
    if (category === undefined) {
      return ''
    }
    let baseUrl = '/models/'
    baseUrl += category.category !== null ? category.category.slug : 'all'
    baseUrl += category.tag !== null ? `?tag=${category.tag}` : ''

    return baseUrl
  }

  getImageUrl (thumbnail: any): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail.url}` : ''
  }
}
