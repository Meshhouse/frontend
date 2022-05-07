import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class Breadcrumbs extends Vue {
  @Prop({ type: Array, default: [] }) readonly elements!: any[]
}
