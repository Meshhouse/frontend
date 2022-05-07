import { Vue, Component, Prop } from 'nuxt-property-decorator'
import LoaderSlider from '@/components/Loader/LoaderSlider.vue'
import { hydrateWhenVisible } from 'vue-lazy-hydration'

import type {
  ModelFull
} from '@/types/api/models'

@Component<ModelSliderOverlay>({
  components: {
    LoaderSlider,
    VueModelViewer: hydrateWhenVisible(
      () => import('@/components/ModelViewer/ModelViewer.vue'),
      { observerOptions: { rootMargin: '100px' } }
    )
  }
})
export default class ModelSliderOverlay extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => {
      return {
        images: [],
        preview: null
      }
    }
  }) readonly model!: ModelFull

  @Prop({
    type: Number,
    default: 0
  }) readonly defaultSlide!: number

  viewerVisible = false

  swiperOption = {
    slidesPerView: 1,
    initialSlide: this.defaultSlide,
    lazy: {
      preloaderClass: 'loading__container--slide'
    },
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      dynamicMainBullets: 3
    },
    zoom: {
      maxRatio: 2
    }
  }

  swiperGallery = {
    initialSlide: this.defaultSlide,
    slidesPerView: 12,
    spaceBetween: 10,
    centeredSlides: true,
    slideToClickedSlide: true
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
