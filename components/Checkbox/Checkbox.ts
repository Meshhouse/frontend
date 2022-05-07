import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'checked',
    event: 'change'
  }
})

export default class DropdownButton extends Vue {
  @Prop({ type: [Boolean, Array], required: true, default: false }) readonly checked!: boolean | any[]
  @Prop({ required: false, default: '' }) readonly value!: string | number

  get isCheckedValue () : boolean {
    if (Array.isArray(this.checked)) {
      return this.checked.includes(this.value)
    } else {
      return this.checked
    }
  }

  handleChange (): void {
    if (Array.isArray(this.checked)) {
      const checked = ([] as any[]).concat(this.checked)

      if (checked.includes(this.value)) {
        checked.splice(checked.indexOf(this.value), 1)
      } else {
        checked.push(this.value)
      }
      this.$emit('change', checked)
    } else {
      this.$emit('change', !this.checked)
    }
  }
}
