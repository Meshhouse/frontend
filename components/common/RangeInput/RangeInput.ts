import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
})

export default class RangeInput extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly value!: number[]
  @Prop({ type: Object, required: true, default: () => {} }) readonly ranges!: any

  get modelValue (): number[] {
    return this.value
  }

  set modelValue (value: number[]) {
    this.$emit('input', value)
  }
}
