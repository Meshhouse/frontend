<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ currentCategory[`title_${$i18n.locale}`] }}
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
    <div
      v-if="pagination.pages > 1"
      class="grid-container"
    >
      <pagination
        :pagination="pagination"
        base-url="models"
        :param="$route.params.category"
      />
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "models-count": "0 models | 1 model | {n} models"
  },
  "ru": {
    "models-count": "0 моделей | {n} модель | {n} модели | {n} моделей"
  }
}
</i18n>

<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component } from 'nuxt-property-decorator'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import type {
  StrapiSimpleModel,
  StrapiCategory,
  StrapiPagination,
  AxiosStrapiModelQuery,
  AxiosStrapiSimpleModelsResponse
} from '@/types'

type ModelCatalogCurrentCategory = {
  [key: string]: string;
  title_en: string;
  title_ru: string;
}

type ModelCatalogAsyncData = {
  models: StrapiSimpleModel[];
  pagination: StrapiPagination;
}

@Component<ModelCatalog>({
  components: {
    ModelCard,
    Pagination
  },
  head () {
    return {
      title: this.currentCategory[`title_${this.$i18n.locale}`]
    }
  },
  watchQuery: [
    'tag',
    'page'
  ]
})

export default class ModelCatalog extends Vue {
  models: StrapiSimpleModel[] = []
  pagination: StrapiPagination = {
    pages: 0,
    count: 0
  }

  get currentCategory (): ModelCatalogCurrentCategory {
    if (this.$route.query.tag !== undefined) {
      return {
        title_en: `Models with tag '${this.$route.query.tag}'`,
        title_ru: `Модели с тегом '${this.$route.query.tag}'`
      }
    }

    return this.$store.state.categories.find((item: StrapiCategory) => item.slug === this.$route.params.category) ?? {
      title_en: 'All models',
      title_ru: 'Все модели'
    }
  }

  async asyncData ({ app, route }: { app: any, route: any }): Promise<ModelCatalogAsyncData> {
    try {
      const params: AxiosStrapiModelQuery = {
        method: 'GET',
        url: '/models',
        params: {
          page: 1,
          count: 50,
          category: 'all'
        }
      }

      if (route.params.category !== 'all') {
        params.params.category = route.params.category
      }
      if (route.query.tag !== undefined) {
        params.params.tag = route.query.tag
      }

      const data: AxiosStrapiSimpleModelsResponse = (await app.$strapi(params)).data

      return {
        models: data.items,
        pagination: data.pagination
      }
    } catch (err) {
      console.log(err)
      return {
        models: [],
        pagination: {
          pages: 0,
          count: 0
        }
      }
    }
  }
}
</script>
