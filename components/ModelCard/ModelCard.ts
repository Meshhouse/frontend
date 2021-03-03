import { format } from 'date-fns'
import { Vue, Component } from 'nuxt-property-decorator'
import VueTag from '@/components/Tag/Tag.vue'

@Component({
  components: {
    VueTag
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    row: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    format
  }
})

export default class ModelCard extends Vue {
  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }

  getUniquePrograms (programs: any[]): string[] {
    const filteredPrograms = new Set(programs.map((item: any) => item.program))
    return [...filteredPrograms]
  }

  getProgramIcon (program: string): string {
    switch (program) {
      case 'autodesk_3ds_max': {
        return '3dsmax'
      }
      case 'unreal_engine': {
        return 'unrealengine'
      }
      default: {
        return program
      }
    }
  }
}
