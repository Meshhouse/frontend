import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { mixin as clickaway } from 'vue-clickaway'

@Component({
  mixins: [
    clickaway
  ]
})

export default class DropdownButton extends Vue {
  @Prop({ type: Boolean, default: false }) readonly noCaret!: boolean
  @Prop({ type: String, default: null }) readonly appendIcon!: string | null
  @Prop({ type: String, default: null }) readonly prependIcon!: string | null
  @Prop({ type: Number, default: null }) readonly width!: number | null

  toggled = false

  toggle (): void {
    this.toggled = !this.toggled
  }

  away (): void {
    this.toggled = false
  }
}
