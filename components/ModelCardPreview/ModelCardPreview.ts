import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  ModelSimple,
  ModelFull
} from '@meshhouse/types'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import ModelSlider from '@/components/ModelSlider/ModelSlider.vue'
import LoaderSlider from '@/components/Loader/LoaderSlider.vue'

import {
  getDccName,
  getRendererName
} from '@/functions/helpers'

@Component<ModelCardPreview>({
  components: {
    Breadcrumbs,
    ModelSlider,
    LoaderSlider
  }
})

export default class ModelCardPreview extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: ModelSimple
  @Prop({ type: Object, required: true }) readonly position!: Record<string, number>

  loading = false
  fullItem: ModelFull = {
    id: -1,
    title_en: 'string',
    title_ru: 'string',
    slug: 'string',
    category: {
      id: -1,
      icon: '',
      parent_id: null,
      slug: 'string',
      title_en: 'string',
      title_ru: 'string',
      description_en: '',
      description_ru: '',
      created_at: '',
      updated_at: ''
    },
    description_en: 'string',
    description_ru: 'string',
    textures_link: '',
    is_mature_content: false,
    polygons: 0,
    vertices: 0,
    blendshapes: false,
    hair_system: false,
    textures: 'procedural',
    uv: false,
    rig: 'bones',
    created_at: '0',
    updated_at: '0',
    files: [],
    tags_en: [],
    tags_ru: [],
    brands: [],
    thumbnail: '',
    images: [],
    preview: null,
    mature_content: false,
    install_paths: {
      textures: '',
      models: ''
    },
    licenses: [],
    collections: [],
    filters: {}
  }

  swiperOption = {
    slidesPerView: 1,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    lazy: {
      preloaderClass: 'loading__container--slide',
      checkInView: false,
      loadOnTransitionStart: true
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      dynamicMainBullets: 3
    }
  }

  get previewStyles () {
    return `top: ${this.position.y || 0}px; left: ${this.position.x || 0}px`
  }

  get breadcrumbsElements (): Record<string, string | boolean>[] {
    return [
      {
        title: this.fullItem.category.title || '',
        href: `/models/${this.fullItem.category.slug}`
      },
      {
        title: this.fullItem.title || '',
        href: `/models/${this.fullItem.category.slug}/${this.fullItem.slug}`,
        active: true
      }
    ]
  }

  get getAvailableFileBlocks (): Record<string, string | string[]>[] {
    const blocks: Record<string, string | string[]>[] = []

    this.fullItem.files.forEach((file) => {
      if (!blocks.find(block => block.program === this.getProgramIcon(file.program) && block.version === file.program_version)) {
        blocks.push({
          program: this.getProgramIcon(file.program),
          version: file.program_version,
          title: `${getDccName(file.program)} ${file.program_version}`,
          renderers: this.fullItem.files.filter(item => item.program === file.program && item.program_version === file.program_version)
            .map(item => `${getRendererName(item.renderer)} ${item.renderer_version}`)
        })
      }
    })

    return blocks
  }

  getProgramIcon (program: string): string {
    switch (program) {
      case '3ds_max': {
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

  async fetchModel () {
    try {
      this.loading = true

      const data: ModelFull = (await this.$api({
        method: 'GET',
        url: `models/${this.item.slug}`,
        headers: this.$generateAuthHeader(`models/${this.item.slug}`, 'GET')
      })).data

      this.fullItem = data
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }

  mounted () {
    this.fetchModel()
  }
}
