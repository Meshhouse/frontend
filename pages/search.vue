<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('search-title', { q: $route.query.q }) }}
          </span>
        </h1>
        <p class="models-count">
          {{ $tc('models-count', pagination.count) }}
        </p>
      </header>
    </div>
    <div class="grid-container grid-container--models">
      <model-card
        v-for="model in models"
        :key="model.id"
        :item="model"
      />
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "search-title": "Search results for '{q}'",
    "models-count": "0 models | 1 model | {n} models"
  },
  "ru": {
    "search-title": "Результаты поиска для '{q}'",
    "models-count": "0 моделей | {n} модель | {n} модели | {n} моделей"
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import type {
  StrapiSimpleModel,
  StrapiPagination,
  AxiosStrapiSearchQuery,
  AxiosStrapiSimpleModelsResponse
} from '@/types'

@Component<ModelSearch>({
  components: {
    ModelCard
  },
  head () {
    return {
      title: this.$t('search-title', { q: this.$route.query.q }).toString()
    }
  }
})

export default class ModelSearch extends Vue {
  models: StrapiSimpleModel[] = []
  pagination: StrapiPagination = {
    pages: 0,
    count: 0
  }

  async asyncData ({ app, route }: { app: any, route: any }): Promise<any> {
    try {
      const params: AxiosStrapiSearchQuery = {
        method: 'GET',
        url: '/models/search',
        params: {
          query: route.query.q,
          limit: -1
        }
      }

      const data: AxiosStrapiSimpleModelsResponse = (await app.$strapi(params)).data

      return {
        models: data.items,
        pagination: data.pagination
      }
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}
</script>
