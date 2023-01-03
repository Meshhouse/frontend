import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  ModelFull,
  CategoryFilter,
  CategoryFilterValueBasic,
  CategoryFilterValueColor
} from '@meshhouse/types'

@Component<ModelCustomSpecifications>({
})

export default class ModelCustomSpecifications extends Vue {
  @Prop({ type: Object, required: true }) readonly model!: ModelFull
  @Prop({ type: Array, required: true }) readonly filters!: CategoryFilter[]


  get specificationList () : any[] {
    const arr: any[] = []

    this.filters.forEach((filter) => {
      if (this.model.filters[filter.key]) {
        let value: any = ''
        let color = ''
        if (filter.type !== 'range') {
          const values = filter.values as CategoryFilterValueBasic[] | CategoryFilterValueColor[]

          const localizedValue = values.find(val => val.value === this.model.filters[filter.key])
          if (localizedValue) {
            value = localizedValue.title || ''
            color = (localizedValue as CategoryFilterValueColor).color || ''
          }
        } else {
          value = this.model.filters[filter.key]
        }

        arr.push({
          title: filter.title,
          value,
          key: filter.key,
          color
        })
      }
    })

    return arr
  }
}
