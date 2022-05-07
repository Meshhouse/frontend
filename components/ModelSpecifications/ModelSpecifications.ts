import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { format } from 'date-fns'

import type {
  ModelFull
} from '@/types/api/models'

@Component<ModelSpecifications>({
  methods: {
    format
  }
})

export default class ModelSpecifications extends Vue {
  @Prop({ type: Object, required: true }) readonly model!: ModelFull


  get specificationList (): any[] {
    return [
      {
        slug: 'id',
        value: `MSH-${this.model.id}`
      },
      {
        slug: 'created_at',
        value: format(new Date(this.model.created_at), 'dd.MM.yyyy')
      },
      {
        slug: 'polygons',
        value: this.model.polygons
      },
      {
        slug: 'vertices',
        value: this.model.vertices
      },
      {
        slug: 'geometry',
        value: this.localizedGeometryName
      },
      {
        slug: 'hair_system',
        value: this.localizedHairName,
        as_boolean: this.model.hair_system === false,
        with_icon: true
      },
      {
        slug: 'blendshapes',
        value: this.model.blendshapes,
        as_boolean: this.model.blendshapes === true || this.model.blendshapes === false,
        with_icon: true
      },
      {
        slug: 'rig',
        value: this.localizedRigName,
        as_boolean: this.model.rig === false,
        with_icon: true
      },
      {
        slug: 'textures',
        value: this.localizedTexturesName,
        as_boolean: this.model.textures === false,
        with_icon: true
      },
      {
        slug: 'uv',
        value: this.localizedUVName,
        as_boolean: this.model.uv === false,
        with_icon: true
      }
    ]
  }

  get localizedGeometryName (): string | boolean {
    return this.$t('specification-locales.geometry.quads').toString()
  }

  get localizedHairName (): string | boolean {
    return this.model.hair_system
      ? this.$t(`specification-locales.hair-system.${this.model.hair_system}`).toString()
      : false
  }

  get localizedRigName (): string | boolean {
    return this.model.rig
      ? this.$t(`specification-locales.rig.${this.model.rig}`).toString()
      : false
  }

  get localizedTexturesName (): string | boolean {
    return this.model.textures
      ? this.$t(`specification-locales.textures.${this.model.textures}`).toString()
      : false
  }

  get localizedUVName (): string | boolean {
    return this.model.uv
      ? this.$t(`specification-locales.uv.${this.model.uv}`).toString()
      : false
  }
}
