<template>
  <div>
    <index-carousel :slides="sliderBlock.content" />
    <index-our-features />
    <featured-categories
      v-if="featuredBlock.content.length === 4"
      :categories="featuredBlock.content"
    />
    <index-programs :stats="statistics" />
    <index-uploaded-models
      v-if="lastUploadedModels.length > 0"
      :models="lastUploadedModels"
    />
  </div>
</template>

<i18n>
{
  "en": {
    "meta": {
      "index": {
        "description": "Free 3d models for commercial use. 3ds Max, Maya, Blender, Cinema4D, Unity and Unreal Engine-ready"
      }
    }
  },
  "ru": {
    "meta": {
      "index": {
        "description": "Бесплатные 3d модели для коммерческого использования. 3ds Max, Maya, Blender, Cinema4D, Unity and Unreal Engine-ready"
      }
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import IndexCarousel from '@/components/Pages/Index/IndexCarousel.vue'
import IndexPrograms from '@/components/Pages/Index/IndexPrograms.vue'
import IndexUploadedModels from '@/components/Pages/Index/IndexUploadedModels.vue'
import FeaturedCategories from '@/components/Pages/Index/FeaturedCategories.vue'
import IndexOurFeatures from '@/components/Pages/Index/IndexOurFeatures.vue'

import type {
  CourtesyDynamicBlock,
  FeaturedCategoriesDynamicBlock
} from '@/types/api/blocks'

import type {
  ModelSimple
} from '@/types/api/models'

import type {
  WithPagination
} from '@/types/api'

import type { NuxtApp } from '@nuxt/types/app'

@Component<IndexPage>({
  components: {
    FeaturedCategories,
    IndexCarousel,
    IndexPrograms,
    IndexUploadedModels,
    IndexOurFeatures
  },
  head () {
    return {
      title: `MeshHouse - ${this.$t('meta.index.description').toString()}`,
      titleTemplate: undefined,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.index.description').toString() }
      ]
    }
  }
})

export default class IndexPage extends Vue {
  sliderBlock: CourtesyDynamicBlock = {
    id: -1,
    type: 'courtesy_slider',
    content: [],
    created_at: '',
    updated_at: ''
  }

  featuredBlock: FeaturedCategoriesDynamicBlock = {
    id: -1,
    type: 'featured_categories',
    content: [],
    created_at: '',
    updated_at: ''
  }

  lastUploadedModels: ModelSimple[] = []

  statistics = {
    max: 0,
    maya: 0,
    blender: 0,
    c4d: 0,
    unity: 0,
    unreal: 0
  }

  async asyncData ({ app }: { app: NuxtApp }): Promise<any> {
    try {
      const responses = await Promise.all([
        app.$api.request<CourtesyDynamicBlock>({
          method: 'GET',
          url: 'blocks/courtesy_slider',
          headers: app.$generateAuthHeader('blocks/courtesy_slider', 'GET')
        }),
        app.$api.request<FeaturedCategoriesDynamicBlock>({
          method: 'GET',
          url: 'blocks/featured_categories',
          headers: app.$generateAuthHeader('blocks/featured_categories', 'GET')
        }),
        app.$api.request<WithPagination<ModelSimple[]>>({
          method: 'POST',
          url: 'models',
          data: {
            page: 1,
            count: 5
          },
          headers: {
            ...app.$generateAuthHeader('models', 'POST'),
            'x-meshhouse-mature-content': false
          }
        }),
        app.$api.request<any>({
          method: 'GET',
          url: 'pages/index/stats',
          headers: {
            ...app.$generateAuthHeader('pages/index/stats', 'GET')
          }
        })
      ])

      const sliderBlock = responses[0].data
      const featuredBlock = responses[1].data
      const lastUploadedModels = responses[2].data.items
      const statistics = responses[3].data.stats

      return {
        sliderBlock,
        featuredBlock,
        lastUploadedModels,
        statistics
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
