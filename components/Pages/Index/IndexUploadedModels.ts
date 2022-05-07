import { Vue, Component, Prop } from 'nuxt-property-decorator'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import type {
  ModelSimple
} from '@/types/api/models'

@Component({
  components: {
    ModelCard
  }
})

export default class IndexUploadedModels extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly models!: ModelSimple[]
}
