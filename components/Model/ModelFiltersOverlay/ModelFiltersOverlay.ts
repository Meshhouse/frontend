import { Vue, Component, Prop, PropSync } from 'nuxt-property-decorator'
import type {
  CategoryFilter
} from '@meshhouse/types'
import ModelFilters from '@/components/Model/ModelFilters/ModelFilters.vue'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

import type {
  ModelSelectedFilters
} from '@/types'

@Component<ModelFiltersOverlay>({
  components: {
    ModelFilters,
    ModalBasic
  },
  model: {
    prop: 'selectedFilters',
    event: 'input'
  }
})

export default class ModelFiltersOverlay extends Vue {
  @Prop({ type: Object, required: true }) readonly selectedFilters !:ModelSelectedFilters
  @Prop({ type: Array, required: true }) readonly categoryFilters !:CategoryFilter[]
  @Prop({ type: Boolean, required: false, default: false }) readonly loading !:boolean
  @PropSync('sorting', { required: false, default: 'created_at:desc' }) readonly sortingVal !:string

  visible = false

  sortingItems = [
    {
      text: this.$t('sorting.created_at:asc').toString(),
      value: 'created_at:asc'
    },
    {
      text: this.$t('sorting.created_at:desc').toString(),
      value: 'created_at:desc'
    },
    {
      text: this.$t('sorting.title:asc').toString(),
      value: 'title:asc'
    },
    {
      text: this.$t('sorting.title:desc').toString(),
      value: 'title:desc'
    }
  ]

  onSubmit (): void {
    this.visible = false
    this.$emit('submit')
  }
}
