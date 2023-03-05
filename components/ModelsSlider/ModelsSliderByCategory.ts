import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  ModelSimple,
  ModelAccessories
} from '@meshhouse/types'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

@Component({
  components: {
    ModelCard
  }
})

export default class ModelsSlider extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => {
      return {
        categories: [],
        models: {}
      }
    }
  }) readonly accessories!: ModelAccessories

  currentCategory = -1

  get models (): ModelSimple[] {
    return this.accessories.models[this.currentCategory]
  }

  @Prop({
    type: String,
    required: true,
    default: ''
  }) readonly title!: string

  swiperOption = {
    slidesPerView: 'auto',
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

  swiperCategoriesOption = {
    slidesPerView: 'auto'
  }

  created () {
    this.currentCategory = this.accessories.categories[0].id
  }
}
