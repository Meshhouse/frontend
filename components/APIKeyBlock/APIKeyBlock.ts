import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { format } from 'date-fns'

import type {
  APIToken
} from '@/types'

@Component<APIKeyBlock>({
  methods: {
    format
  }
})
export default class APIKeyBlock extends Vue {
  @Prop({ type: Object, required: true }) readonly block!: APIToken
}
