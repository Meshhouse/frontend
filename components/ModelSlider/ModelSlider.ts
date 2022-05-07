import { Vue, Component, Prop } from 'nuxt-property-decorator'
import LoaderSlider from '@/components/Loader/LoaderSlider.vue'
import Overlay from '@/components/Overlay/Overlay.vue'
import ModelSliderOverlay from '@/components/Modals/ModelSliderOverlay/ModelSliderOverlay.vue'
import { hydrateWhenVisible } from 'vue-lazy-hydration'

import type {
  ModelFull
} from '@/types/api/models'
@Component({
  components: {
    Overlay,
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
