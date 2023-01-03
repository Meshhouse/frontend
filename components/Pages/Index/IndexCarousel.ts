import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  IndexPageCourtesySlide
} from '@meshhouse/types'
@Component({})

export default class IndexCarousel extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly slides!: IndexPageCourtesySlide[]

  swiperOption = {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false
  }
}
