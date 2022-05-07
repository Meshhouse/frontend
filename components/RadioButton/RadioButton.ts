import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'checked',
    event: 'change'
  }
})

export default class RadioButton extends Vue {
  @Prop({ required: true, default: '' }) readonly checked!: string | number
  @Prop({ required: false, default: '' }) readonly value!: string | number
  @Prop({ type: Boolean, required: false, default: false }) readonly disabled!: boolean

  get isCheckedValue () : boolean {
    return this.checked === this.value
  }
}
