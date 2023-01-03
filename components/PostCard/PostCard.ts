import { format } from 'date-fns'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  BlogSimple,
  BlogFull
} from '@meshhouse/types'

@Component<PostCard>({
  methods: {
    format
  }
})

export default class PostCard extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: BlogFull | BlogSimple
  @Prop({ type: Boolean, required: false, default: false }) readonly fullItem!: boolean
}
