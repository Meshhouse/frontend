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
    const arr: Record<string, string>[] = []

    this.filters.forEach((filter) => {
      if (this.model.filters[filter.key]) {
        let value = ''
        let color = ''

        if (filter.type !== 'range') {
          const values = filter.values as CategoryFilterValueBasic[] | CategoryFilterValueColor[]

          if (Array.isArray(this.model.filters[filter.key])) {
            (this.model.filters[filter.key] as string[]).forEach((filterValue, idx) => {
              const localizedValue = values.find(val => val.value === filterValue)

              if (localizedValue && localizedValue.title) {
                value += localizedValue.title
              }
              if (idx + 1 < this.model.filters[filter.key].length) {
                value += ', '
              }
            })
          } else {
            const localizedValue = values.find(val => val.value === this.model.filters[filter.key])
            if (localizedValue) {
              value = localizedValue.title || ''
              color = (localizedValue as CategoryFilterValueColor).color || ''
            }
          }
        } else {
          value = this.model.filters[filter.key] as string
          if (filter.unit) {
            value += ` ${filter.unit}`
          }
        }

        arr.push({
          title: filter.title || '',
          value,
          key: filter.key,
          color
        })
      }
    })

    return arr
  }
}
