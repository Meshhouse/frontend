import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { hydrateWhenVisible } from 'vue-lazy-hydration'
import type {
  ModelFull
} from '@meshhouse/types'
import LoaderSlider from '@/components/Loader/LoaderSlider.vue'
import ModelSliderOverlay from '@/components/Modals/ModelSliderOverlay/ModelSliderOverlay.vue'

@Component({
  components: {
    ModelSliderOverlay,
    LoaderSlider,
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
  }) readonly model!: ModelFull

  @Prop({
    type: Boolean,
    default: false
  }) readonly togglePreview!: boolean

  viewerVisible = false
  overlayVisible = false
  lightboxSlide = 0

  swiperOption = {
    slidesPerView: 1,
    lazy: {
      preloaderClass: 'loading__container--slide',
      checkInView: true,
      loadOnTransitionStart: true
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
    }
  }

  swiperGallery = {
    slidesPerView: 12,
    spaceBetween: 10,
    centeredSlides: true,
    slideToClickedSlide: true
  }

  openLightboxOnSlide (slide: number): void {
    this.lightboxSlide = slide
    this.overlayVisible = !this.overlayVisible
  }

  mounted (): void {
    this.initSliderControls()
  }

  initSliderControls (): void {
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
    } else {
      setTimeout(() => this.initSliderControls(), 100)
    }
  }

  @Watch('lightboxSlide')
  updateSlider (idx: number) {
    const swiperTop = (this.$refs.swiperTop as any).$swiper

    swiperTop.slideTo(idx)
  }
}
