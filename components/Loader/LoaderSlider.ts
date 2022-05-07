import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class LoaderSlider extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) readonly hideBackground!: boolean

  get loaderClass (): any[] {
    return [
      { 'loading__container--without-background': this.hideBackground }
    ]
  }
}
