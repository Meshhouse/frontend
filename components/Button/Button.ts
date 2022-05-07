import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class VueButton extends Vue {
  @Prop({ type: Boolean, default: false }) readonly dropdown!: boolean
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: Boolean, default: false }) readonly icon!: boolean
  @Prop({ type: String, default: 'default' }) readonly color!: string
  @Prop({ type: String, default: 'md' }) readonly size!: string
  @Prop({ type: String, default: '' }) readonly href!: string


  get buttonClass (): any[] {
    return [
      `button--${this.color}`,
      { 'button--dropdown': this.dropdown },
      { 'button--icon': this.icon },
      `button--${this.size}`,
      { 'button--disabled': this.disabled }
    ]
  }

  onClick (event: any): void {
    if (!this.disabled) {
      this.$emit('click', event)
    }
  }
}
