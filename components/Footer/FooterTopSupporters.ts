import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  SiteSupporter
} from '@/types/api/blocks'

@Component({})

export default class FooterTopSupporters extends Vue {
  @Prop({ type: Array, required: true, default: [] }) readonly supporters!: SiteSupporter[]
}
