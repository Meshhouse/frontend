import { Vue, Component, Prop } from 'nuxt-property-decorator'
import FsLightbox from 'fslightbox-vue'
import { hydrateWhenVisible } from 'vue-lazy-hydration'
import type { StrapiModel } from '@/types'
@Component({
  components: {
    FsLightbox,
    VueModelViewer: hydrateWhenVisible(
      () => import('@/components/ModelViewer/ModelViewer.vue'),
      { observerOptions: { rootMargin: '100px' } }
    )
  }
})

export default class ModelSlider extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => {
      return {
        images: [],
        preview: null
      }
    }
  }) readonly model!: StrapiModel

  viewerVisible = false
  toggleLightBox = false
  lightboxSlide = 1

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

  openLightboxOnSlide (slide: number): void {
    this.lightboxSlide = slide
    this.toggleLightBox = !this.toggleLightBox
  }

  get lightboxSources (): string[] {
    return this.model.images.map((image: any) => this.getImageUrl(image))
  }

  mounted (): void {
    this.$nextTick(() => {
      if (this.$refs.swiperTop !== undefined && this.$refs.swiperThumbs !== undefined) {
        const swiperTop = (this.$refs.swiperTop as any).$swiper
        const swiperThumbs = (this.$refs.swiperThumbs as any).$swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop

        swiperTop.on('slideChange', () => {
          if (swiperTop.activeIndex === this.model.images.length) {
            this.viewerVisible = true
          }
        })
      }
    })
  }
}
