import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})

export default class IndexPrograms extends Vue {
  @Prop({
    type: Object,
    required: false,
    default: () => {
      return {
        max: 0,
        maya: 0,
        blender: 0,
        c4d: 0,
        unity: 0,
        unreal: 0
      }
    }
  }) readonly stats!: any
}
