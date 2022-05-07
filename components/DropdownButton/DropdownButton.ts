import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { mixin as clickaway } from 'vue-clickaway'

@Component({
  mixins: [
    clickaway
  ]
})

export default class DropdownButton extends Vue {
  @Prop({ type: Boolean, default: false }) readonly noCaret!: boolean
  @Prop({ type: Boolean, default: false }) readonly iconOnly!: boolean
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: String, default: null }) readonly appendIcon!: string | null
  @Prop({ type: String, default: null }) readonly prependIcon!: string | null
  @Prop({ type: String, default: 'primary' }) readonly color!: string
  @Prop({ type: Number, default: null }) readonly width!: number | null
  @Prop({ type: Boolean, default: false }) readonly noClickaway!: boolean
  @Prop({ type: String, default: 'bottom' }) readonly align!: string

  toggled = false

  get dropdownClass (): any[] {
    return [
      { 'dropdown--active': this.toggled }
    ]
  }

  get containerClass (): any[] {
    return [
      { 'dropdown__container--active': this.toggled },
      `dropdown__container--align-${this.align}`
    ]
  }

  toggle (): void {
    if (!this.disabled) {
      this.toggled = !this.toggled
    }
  }

  away (): void {
    if (!this.noClickaway) {
      this.toggled = false
    }
  }

  toggleContainer (event: PointerEvent): void {
    const closableTags = ['A']

    const target = (event.target as HTMLElement)

    if (closableTags.includes(target.tagName)) {
      this.toggle()
    }
  }
}
