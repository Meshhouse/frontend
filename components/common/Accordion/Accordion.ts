import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class VueAccordion extends Vue {
  @Prop({ type: Boolean, default: false }) readonly activeByDefault!: boolean
  @Prop({ type: Boolean, default: false }) readonly alwaysActive!: boolean
  @Prop({ type: Boolean, default: false }) readonly selected!: boolean
  @Prop({ type: Number, default: 0 }) readonly counter!: number

  active = false

  created (): void {
    this.active = this.activeByDefault

    if (this.alwaysActive) {
      this.active = true
    }
  }

  activate (): void {
    if (!this.alwaysActive) {
      this.active = !this.active
    }
  }
}
