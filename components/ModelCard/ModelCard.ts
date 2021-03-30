import { format } from 'date-fns'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import VueTag from '@/components/Tag/Tag.vue'
import type { StrapiSimpleModel } from '@/types'

@Component<ModelCard>({
  components: {
    VueTag
  },
  methods: {
    format
  }
})

export default class ModelCard extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: StrapiSimpleModel;
  @Prop({ type: Boolean, required: false, default: false }) readonly row!: boolean;

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }

  getProgramIcon (program: string): string {
    switch (program) {
      case 'autodesk_3ds_max': {
        return '3dsmax'
      }
      case 'unreal_engine': {
        return 'unrealengine'
      }
      default: {
        return program
      }
    }
  }

  get isInFavorite (): boolean {
    return this.$store.state.favorites.find((item: number) => item === this.item.id) !== undefined
  }
}
