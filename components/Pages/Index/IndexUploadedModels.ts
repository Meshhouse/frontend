import { Vue, Component, Prop } from 'nuxt-property-decorator'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import type { StrapiSimpleModel } from '@/types'

@Component({
  components: {
    ModelCard
  }
})

export default class IndexUploadedModels extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly models!: StrapiSimpleModel[]
}
