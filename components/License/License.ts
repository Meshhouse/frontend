import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  License
} from '@meshhouse/types'

@Component({})

export default class LicenseBlock extends Vue {
  @Prop({ type: Object, required: true }) readonly license!: License

  get isDisabledLicense (): boolean {
    if (this.license.access === 'free') {
      return false
    }

    return !this.$isLogged() || !['subscriber', 'admin'].includes(this.$store.state.user.role)
  }
}
