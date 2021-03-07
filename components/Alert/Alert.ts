import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class VueAlert extends Vue {
  @Prop({ type: String, default: '' }) readonly title!: string
  @Prop({ type: String, default: 'primary' }) readonly type!: string

  get fontAwesomeIcon (): string {
    switch (this.type) {
      case 'primary': {
        return 'info'
      }
      case 'success': {
        return 'check'
      }
      case 'danger': {
        return 'times'
      }
      case 'warning': {
        return 'exclamation'
      }
      case 'onlyfans': {
        return 'venus'
      }
      default: {
        return 'info'
      }
    }
  }
}
