import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component<APIKeySuccessModal>({
})
export default class APIKeySuccessModal extends Vue {
  @Prop({ type: String, required: true, default: '' }) readonly token!: string
}
