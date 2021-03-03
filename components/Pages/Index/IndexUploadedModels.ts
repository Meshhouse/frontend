import { Vue, Component } from 'nuxt-property-decorator'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

@Component({
  components: {
    ModelCard
  },
  props: {
    models: {
      type: Array,
      required: true,
      default: () => []
    }
  }
})

export default class IndexUploadedModels extends Vue {
}
