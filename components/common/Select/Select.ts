import { Vue, Component, Prop } from 'nuxt-property-decorator'

type VueSelectItem = {
  text: string,
  value: string | number | boolean
}

@Component<VueSelect>({
  model: {
    prop: 'value',
    event: 'change'
  }
})
export default class VueSelect extends Vue {
  @Prop({ required: true, default: false }) readonly value!: string | number | boolean
  @Prop({ type: Array, required: true, default: [] }) readonly items!: VueSelectItem[]
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: String, default: 'md' }) readonly size!: string
  @Prop({ type: String, default: '' }) readonly icon!: string

  visible = false

  get selectedValue (): any {
    return this.items.find(item => item.value === this.value)?.text
  }

  get selectClass (): any[] {
    return [
      `select--${this.size}`,
      { 'select--with-icon': this.icon !== '' },
      { 'select--visible': this.visible },
      { 'select--disabled': this.disabled }
    ]
  }

  onClick (option: VueSelectItem): void {
    this.$emit('change', option.value)
    this.visible = false
  }
}
