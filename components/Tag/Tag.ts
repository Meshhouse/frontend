import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type { StrapiModelTag } from '@/types'

@Component({})

export default class VueTag extends Vue {
  @Prop({ type: Object, required: true }) readonly tag!: StrapiModelTag
}
