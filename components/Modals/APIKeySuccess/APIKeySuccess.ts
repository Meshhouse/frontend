import { Vue, Component, Prop } from 'nuxt-property-decorator'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

@Component<APIKeySuccessModal>({
  components: {
    ModalBasic
  }
})
export default class APIKeySuccessModal extends Vue {
  @Prop({ type: String, required: true, default: '' }) readonly token!: string
}
