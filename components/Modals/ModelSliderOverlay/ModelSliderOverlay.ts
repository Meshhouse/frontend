import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { hydrateWhenVisible } from 'vue-lazy-hydration'
import type {
  ModelFull
} from '@meshhouse/types'
import LoaderSlider from '@/components/Loader/LoaderSlider.vue'

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
  currentIndex = 0
  isInFullscreen = false

  swiperOption = {
    slidesPerView: 1,
    initialSlide: this.defaultSlide,
    lazy: {
      preloaderClass: 'loading__container--slide'
      // checkInView: true,
      // loadOnTransitionStart: true
    },
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.model-slider-overlay__wrapper .swiper-pagination',
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

  get totalSlides () {
    let count = this.model.images.length

    if (this.model.preview) {
      count++
    }

    return count
  }

  mounted (): void {
    this.currentIndex = this.defaultSlide
    this.isInFullscreen = document.fullscreenElement !== null

    this.$nextTick(() => {
      if (this.$refs.swiperTop !== undefined && this.$refs.swiperThumbs !== undefined) {
        const swiperTop = (this.$refs.swiperTop as any).$swiper
        const swiperThumbs = (this.$refs.swiperThumbs as any).$swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop

        swiperTop.on('slideChange', () => {
          this.currentIndex = swiperTop.activeIndex
          this.$emit('change-slide', this.currentIndex)

          if (swiperTop.activeIndex === this.model.images.length) {
            this.viewerVisible = true
          }
        })
      }
    })

    document.addEventListener('fullscreenchange', this.checkForFullScreen)
  }

  beforeDestroy () {
    document.removeEventListener('fullscreenchange', this.checkForFullScreen)
  }

  checkForFullScreen () {
    this.isInFullscreen = document.fullscreenElement !== null
  }

  handleFullScreen () {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen()
    } else {
      document.body.requestFullscreen()
    }
  }
}
