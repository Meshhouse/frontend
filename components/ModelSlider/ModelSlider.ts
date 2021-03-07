import { Vue, Component } from 'nuxt-property-decorator'
import '@meshhouse/model-viewer'

@Component({
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {
        return {
          images: [],
          preview: null
        }
      }
    }
  }
})

export default class ModelSlider extends Vue {
  swiperOption = {
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination'
    }
  }

  swiperGallery = {
    slidesPerView: 12,
    spaceBetween: 10,
    centeredSlides: true,
    slideToClickedSlide: true
  }

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }

  mounted (): void {
    this.$nextTick(() => {
      if (this.$refs.swiperTop !== undefined && this.$refs.swiperThumbs !== undefined) {
        const swiperTop = (this.$refs.swiperTop as any).$swiper
        const swiperThumbs = (this.$refs.swiperThumbs as any).$swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      }
    })
  }
}
