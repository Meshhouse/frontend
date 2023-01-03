<template>
  <main class="layout layout--models-favorite">
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('navigation.favorites') }}
          </span>
        </h1>
        <p class="models-count">
          {{ $tc('common["models-count"]', models.length) }}
        </p>
      </header>
      <div
        v-if="models.length > 0"
        class="models-cards"
      >
        <model-card
          v-for="model in models"
          :key="model.id"
          :item="model"
        />
      </div>
      <div
        v-else
        class="models-cards--empty"
      >
        <font-awesome-icon icon="sad-cry" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import type { NuxtApp } from '@nuxt/types/app'
import type {
  ModelSimple
} from '@meshhouse/types'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

@Component<Favorites>({
  components: {
    ModelCard
  }
})
export default class Favorites extends Vue {
  models: ModelSimple[] = []

  async asyncData ({ app }: { app: NuxtApp, route: any, store: any, error: any }): Promise<any> {
    try {
      const ids = app.$cookies.get('favorites')

      if (Array.isArray(ids) && ids.length > 0) {
        const data = (await app.$api.request({
          method: 'POST',
          url: 'models/favorites',
          data: {
            ids
          },
          headers: app.$generateAuthHeader('models/favorites', 'POST')
        })).data

        return {
          models: data
        }
      }
    } catch (err) {
      app.$sentry.captureException(err)
      console.error(err)
    }
  }
}
</script>
