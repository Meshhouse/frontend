import { Component, Prop, mixins, Watch } from 'nuxt-property-decorator'
import { mixin as clickaway } from 'vue-clickaway'

@Component({})

export default class Overlay extends mixins(clickaway) {
  @Prop({ type: Boolean, required: true, default: false }) readonly visible!: boolean

  @Watch('visible')
  updateScroll (val: boolean) {
    this.$store.commit('setModalVisibility', val)
  }

  onClickAway (event: PointerEvent) {
    const path = event.composedPath()
    const excludedClassed = [
      'notification-container'
    ]

    if (!path.find(val => excludedClassed.includes((val as HTMLDivElement).className))) {
      this.$emit('close')
    }
  }
}
