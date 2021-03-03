import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
})

export default class VueTag extends Vue {
  onClick () {
    this.$router.push(this.localePath('/models/all?tag=' + this.$props.tag[`title_${this.$i18n.locale}`]))
  }
}
