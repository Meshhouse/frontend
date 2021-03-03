import { Vue, Component } from 'nuxt-property-decorator'
import { mixin as clickaway } from 'vue-clickaway'

@Component({
  mixins: [
    clickaway
  ]
})

export default class DropdownButton extends Vue {
  toggled = false

  toggle (): void {
    this.toggled = !this.toggled
  }

  away (): void {
    this.toggled = false
  }
}
