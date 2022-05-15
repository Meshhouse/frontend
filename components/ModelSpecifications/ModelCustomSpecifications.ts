import { Vue, Component, Prop } from 'nuxt-property-decorator'

import type {
  ModelFull
} from '@/types/api/models'

import type {
  CategoryFilter
} from '@/types/api/categories'

@Component<ModelCustomSpecifications>({
})

export default class ModelCustomSpecifications extends Vue {
  @Prop({ type: Object, required: true }) readonly model!: ModelFull
  @Prop({ type: Array, required: true }) readonly filters!: CategoryFilter[]


  get specificationList() : any[] {
    const arr: any[] = []

    this.filters.forEach((filter) => {
      if (this.model.filters[filter.key]) {
        let value: any = ''
        let color = ''
        if (filter.type !== 'range') {
          const localizedValue = filter.values.find(val => val.value === this.model.filters[filter.key])
          value = localizedValue[`title_${this.$i18n.locale}`]
          color = localizedValue.color || ''
        } else {
          value = this.model.filters[filter.key]
        }

        arr.push({
          title: filter[`title_${this.$i18n.locale}`],
          value,
          key: filter.key,
          color
        })
      }
    })

    return arr
  }
}
