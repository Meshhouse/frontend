<template>
  <div>
    <div class="grid-container">
      <header class="layout__header-wrapper">
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

@Component<DMCAPolicyPage>({
  head () {
    return {
      title: this.pageContent.title
    }
  }
})

export default class DMCAPolicyPage extends Vue {
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
        url: 'pages/static/dmca-policy',
        headers: app.$generateAuthHeader('pages/static/dmca-policy', 'GET')
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
