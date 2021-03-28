import { format } from 'date-fns'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type { StrapiPost, StrapiSimplePost } from '@/types'

@Component<PostCard>({
  methods: {
    format
  }
})

export default class PostCard extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: StrapiPost | StrapiSimplePost;
  @Prop({ type: Boolean, required: false, default: false }) readonly fullItem!: boolean;

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }
}
