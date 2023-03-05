import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component<Banner>({})

export default class Banner extends Vue {
  @Prop({
    type: String,
    required: true,
    default: 'static'
  }) readonly type!: 'static' | 'interactive'

  @Prop({
    type: String,
    required: false,
    default: ''
  }) readonly href!: string

  @Prop({
    type: String,
    required: false,
    default: ''
  }) readonly imageContent!: string

  @Prop({
    type: String,
    required: false,
    default: ''
  }) readonly scriptContent!: string

  @Prop({
    type: String,
    required: false,
    default: 'category'
  }) readonly size!: string

  @Prop({
    type: String,
    required: false,
    default: ''
  }) readonly alt!: string
}
