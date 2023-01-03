import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component<ModalBasic>({})
export default class ModalBasic extends Vue {
  @Prop({ type: String, default: '' }) readonly title!: string
  @Prop({ type: String, default: 'medium' }) readonly size!: string
  @Prop({ type: String, default: '' }) readonly contentAlign!: string
  @Prop({ type: Boolean, default: false }) readonly contentless!: boolean
  @Prop({ type: Boolean, default: false }) readonly showBackButton!: boolean

  get modalClass () {
    return [
      `modal--${this.size}`
    ]
  }

  get modalContentClass () {
    return [
      this.contentAlign !== '' ? `modal__content--${this.contentAlign}` : ''
    ]
  }
}
