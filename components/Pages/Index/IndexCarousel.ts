import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  StrapiFeaturedCategory,
  StrapiIndexSlide
} from '@/types'
@Component({})

export default class IndexCarousel extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly slides!: StrapiIndexSlide[]

  swiperOption = {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false
  }

  getUrl (category: StrapiFeaturedCategory): string {
    let baseUrl = '/models/'
    baseUrl += category.category !== null ? category.category.slug : 'all'
    baseUrl += category.tag !== null ? `?tag=${category.tag}` : ''

    return baseUrl
  }

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }
}
