import { format } from 'date-fns'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  ModelSimple
} from '@meshhouse/types'
import VueTag from '@/components/common/Tag/Tag.vue'

@Component<ModelCard>({
  components: {
    VueTag,
    ModelCardPreview: () => import('@/components/ModelCardPreview/ModelCardPreview.vue')
  },
  methods: {
    format
  }
})

export default class ModelCard extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: ModelSimple
  @Prop({ type: Boolean, required: false, default: false }) readonly row!: boolean

  showPreview = false

  position: Record<string, number> = {
    x: 0,
    y: 0
  }

  previewTimer?: NodeJS.Timeout

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

  handleShowPreview () {
    if (window.matchMedia('(min-width: 1200px)').matches) {
      this.previewTimer = setTimeout(() => {
        const previewSize = 600
        const boundaries = this.$el.getBoundingClientRect()

        this.position.x = boundaries.left + boundaries.width
        this.position.y = boundaries.top - ((previewSize - boundaries.height) / 2)

        if (this.position.x + previewSize >= window.innerWidth) {
          this.position.x = boundaries.left - previewSize
        }

        if (this.position.y < 0) {
          this.position.y = boundaries.top > 0 ? boundaries.top : 0
        }

        if (boundaries.top + previewSize >= window.innerHeight) {
          this.position.y = this.position.y + (window.innerHeight - (boundaries.top + previewSize))
        }

        this.showPreview = true
      }, 1000)
    }
  }

  removeTimeout () {
    clearTimeout(this.previewTimer)
    this.showPreview = false
  }
}
