import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  SiteSupporter
} from '@meshhouse/types'

@Component({})

export default class FooterTopSupporters extends Vue {
  @Prop({ type: Array, required: true, default: [] }) readonly supporters!: SiteSupporter[]
}
