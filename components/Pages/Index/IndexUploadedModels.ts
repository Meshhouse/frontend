import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  ModelSimple
} from '@meshhouse/types'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

@Component({
  components: {
    ModelCard
  }
})

export default class IndexUploadedModels extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly models!: ModelSimple[]
}
