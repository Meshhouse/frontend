import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  License
} from '@meshhouse/types'

@Component({})

export default class LicenseBlock extends Vue {
  @Prop({ type: Object, required: true }) readonly license!: License
}
