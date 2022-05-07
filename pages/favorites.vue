<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('pages.favorites.title') }}
          </span>
        </h1>
        <p class="models-count">
          {{ $tc('models-count', $store.state.favorites.length) }}
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
    "pages": {
      "favorites": {
        "title": "Favorites"
      }
    },
    "models-count": "0 models | 1 model | {n} models"
  },
  "ru": {
    "pages": {
      "favorites": {
        "title": "Список желаемого"
      }
    },
    "models-count": "0 моделей | {n} модель | {n} модели | {n} моделей"
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import type { NuxtApp } from '@nuxt/types/app'

@Component<ModelFavorites>({
  components: {
    ModelCard
  },
  head () {
    return {
      title: this.$t('pages.favorites.title').toString()
    }
  }
})

export default class ModelFavorites extends Vue {
  models: StrapiSimpleModel[] = []

  async asyncData ({ app, store }: { app: NuxtApp, store: any }): Promise<any> {
    try {
      const params: AxiosStrapiFavoritesQuery = {
        method: 'POST',
        url: '/models/favorites',
        data: {
          ids: store.state.favorites
        }
      }

      const data: StrapiSimpleModel[] = (await app.$strapi(params)).data

      return {
        models: data
      }
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}
</script>
