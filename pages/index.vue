<template>
  <div>
    <index-carousel :slides="indexPageData.slider" />
    <index-our-features />
    <featured-categories :categories="indexPageData.featuredCategories" />
    <index-programs :stats="indexPageData.statistics" />
    <index-uploaded-models :models="indexPageData.lastUploadedModels" />
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
import type { StrapiIndexPage } from '@/types'

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
  indexPageData: StrapiIndexPage = {
    featuredCategories: [],
    slider: [],
    statistics: {
      max: 0,
      maya: 0,
      blender: 0,
      c4d: 0,
      unity: 0,
      unreal: 0
    },
    lastUploadedModels: []
  }

  async asyncData ({ app }: { app: any }): Promise<{ indexPageData: StrapiIndexPage }> {
    try {
      const indexPageData: StrapiIndexPage = (await app.$strapi({
        method: 'GET',
        url: '/mainpage'
      })).data

      return {
        indexPageData
      }
    } catch (err) {
      console.log(err)
      return {
        indexPageData: {
          featuredCategories: [],
          slider: [],
          statistics: {
            max: 0,
            maya: 0,
            blender: 0,
            c4d: 0,
            unity: 0,
            unreal: 0
          },
          lastUploadedModels: []
        }
      }
    }
  }
}
</script>
