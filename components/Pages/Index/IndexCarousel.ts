import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  props: {
    slides: {
      type: Array,
      required: true,
      default: () => []
    }
  }
})

export default class IndexCarousel extends Vue {
  swiperOption = {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false
  }

  getUrl (category: any): string {
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
