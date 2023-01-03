import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  CategoryFilter,
  CategoryFilterValueRange
} from '@meshhouse/types'
import Accordion from '@/components/common/Accordion/Accordion.vue'
import Checkbox from '@/components/common/Checkbox/Checkbox.vue'
import RangeInput from '@/components/common/RangeInput/RangeInput.vue'
import RadioButton from '@/components/common/RadioButton/RadioButton.vue'

import type {
  ModelSelectedFilters
} from '@/types'

@Component<ModelFilters>({
  components: {
    Accordion,
    Checkbox,
    RangeInput,
    RadioButton
  },
  model: {
    prop: 'selectedFilters',
    event: 'input'
  }
})

export default class ModelFilters extends Vue {
  @Prop({ type: Object, required: true }) readonly selectedFilters !:ModelSelectedFilters
  @Prop({ type: Array, required: true }) readonly categoryFilters !:CategoryFilter[]
  @Prop({ type: Boolean, required: false, default: false }) readonly loading !:boolean

  checkSelectedAccordion (filter: CategoryFilter, value: any) {
    if (filter.type === 'checkbox' || filter.type === 'checkbox-color') {
      return value.length > 0
    }
    if (filter.type === 'radio') {
      return filter.key !== 'mature_content'
        ? value !== 'all'
        : value !== 'false'
    }
    if (filter.type === 'range') {
      const values = filter.values[0] as CategoryFilterValueRange
      return value[0] !== values.min || value[1] !== values.max
    }

    return false
  }
}
