import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class VueTag extends Vue {
  @Prop({ type: String, required: true }) readonly tag!: string
}
