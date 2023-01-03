import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component<Stepper>({})

export default class Stepper extends Vue {
  @Prop({ type: Array, required: true, default: () => [] }) readonly steps!: string[]
  @Prop({ type: Number, required: true, default: 0 }) readonly selectedStep!: number

  @Watch('selectedStep')
  setCurrentTab (tab: number) {
    const tabs = this.$children

    tabs.forEach((element: any, idx: number) => {
      element.active = idx === tab
    })
  }

  mounted () {
    this.setCurrentTab(this.selectedStep)
  }
}
