import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  SitePatron
} from '@/types/api/blocks'

@Component({})

export default class FooterPatrons extends Vue {
  @Prop({ type: Array, required: true, default: [] }) readonly patrons!: SitePatron[]
}
