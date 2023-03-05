import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class AppFooter extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  }) readonly simple!: boolean
}
