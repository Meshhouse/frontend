import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})

export default class VueSwitch extends Vue {}
