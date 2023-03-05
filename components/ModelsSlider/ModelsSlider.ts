import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  ModelSimple
} from '@meshhouse/types'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

@Component({
  components: {
    ModelCard
  }
})

export default class ModelsSlider extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  }) readonly models!: ModelSimple[]

  @Prop({
    type: String,
    required: true,
    default: ''
  }) readonly title!: string

  @Prop({
    type: Boolean,
    required: false,
    default: false
  }) readonly blurMatureContent!: boolean

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
}
