import { format } from 'date-fns'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  ModelSimple
} from '@meshhouse/types'
import VueTag from '@/components/common/Tag/Tag.vue'

@Component<ModelCard>({
  components: {
    VueTag
  },
  methods: {
    format
  }
})

export default class ModelCard extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: ModelSimple
  @Prop({ type: Boolean, required: false, default: false }) readonly row!: boolean

  getProgramIcon (program: string): string {
    switch (program) {
      case '3ds_max': {
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
