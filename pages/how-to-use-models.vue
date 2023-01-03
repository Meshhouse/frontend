<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ pageContent.title }}
          </span>
        </h1>
      </header>
    </div>
    <div
      class="grid-container grid-container--posts"
      v-html="pageContent.content"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import type { NuxtApp } from '@nuxt/types/app'
import type {
  StaticPage
} from '@meshhouse/types'
import VueAlert from '@/components/Alert/Alert.vue'

@Component<HowtoUseModelsPage>({
  components: {
    VueAlert
  },
  head () {
    return {
      title: this.pageContent.title
    }
  }
})

export default class HowtoUseModelsPage extends Vue {
  pageContent: StaticPage = {
    id: 0,
    slug: '',
    title: '',
    content: '',
    created_at: '',
    updated_at: ''
  }

  async asyncData ({ app, error }: { app: NuxtApp, error: any }): Promise<{ pageContent: StaticPage } | undefined> {
    try {
      const pageContent: StaticPage = (await app.$api({
        method: 'GET',
        url: 'pages/static/how-to-use-models',
        headers: app.$generateAuthHeader('pages/static/how-to-use-models', 'GET')
      })).data

      return {
        pageContent
      }
    } catch (err) {
      app.$sentry.captureException(err)
      console.error(err)
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  }
}
</script>

<style lang="sass">
.howto
  &__block
    margin: 2rem 0
</style>
