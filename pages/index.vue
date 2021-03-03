<template>
  <div>
    <index-carousel :slides="indexPageData.slider" />
    <index-our-features />
    <featured-categories :categories="indexPageData.featuredCategories" />
    <index-programs />
    <index-uploaded-models :models="lastUploadedModels" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import IndexCarousel from '@/components/Pages/Index/IndexCarousel.vue'
import IndexPrograms from '@/components/Pages/Index/IndexPrograms.vue'
import IndexUploadedModels from '@/components/Pages/Index/IndexUploadedModels.vue'
import FeaturedCategories from '@/components/Pages/Index/FeaturedCategories.vue'
import IndexOurFeatures from '@/components/Pages/Index/IndexOurFeatures.vue'
import LazyHydrate from 'vue-lazy-hydration'

@Component({
  components: {
    FeaturedCategories,
    IndexCarousel,
    IndexPrograms,
    IndexUploadedModels,
    IndexOurFeatures,
    LazyHydrate
  },
  head () {
    return {
      titleTemplate: undefined
    }
  }
})

export default class IndexPage extends Vue {
  async asyncData ({ app }: { app: any }): Promise<any> {
    try {
      const indexPageData = (await app.$strapi({
        method: 'GET',
        url: '/mainpage'
      })).data

      const lastUploadedModels = (await app.$strapi({
        method: 'GET',
        url: '/models',
        params: {
          _limit: 5,
          _sort: 'created_at'
        }
      })).data

      return {
        indexPageData,
        lastUploadedModels
      }
    } catch (err) {
      console.log(err)
      return {
        indexPageData: {},
        lastUploadedModels: []
      }
    }
  }
}
</script>
