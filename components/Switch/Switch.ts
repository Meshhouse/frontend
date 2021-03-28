import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class VueSwitch extends Vue {
  @Prop({ type: Boolean, required: false, default: false }) readonly checked!: boolean
}
