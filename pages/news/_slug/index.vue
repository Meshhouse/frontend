<template>
  <div>
    <div class="grid-container grid-container--posts">
      <post-card
        :item="post"
        full-item
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import type {
  BlogFull
} from '@meshhouse/types'
import type { NuxtApp } from '@nuxt/types/app'
import type { Route } from 'vue-router'
import type { AxiosRequestConfig } from 'axios'
import PostCard from '@/components/PostCard/PostCard.vue'

@Component<NewsSingle>({
  components: {
    PostCard
  },
  head () {
    return {
      title: this.post.title?.toString()
    }
  }
})

export default class NewsSingle extends Vue {
  post: BlogFull = {
    id: -1,
    title_en: 'string',
    title_ru: 'string',
    slug: 'string',
    excerpt_en: 'string',
    excerpt_ru: 'string',
    created_at: 'string',
    updated_at: 'string',
    thumbnail: null,
    content_en: '',
    content_ru: ''
  }

  async asyncData ({ app, route }: { app: NuxtApp, route: Route }): Promise<any> {
    try {
      const params: AxiosRequestConfig = {
        method: 'GET',
        url: `posts/${route.params.slug}`,
        headers: app.$generateAuthHeader(`posts/${route.params.slug}`, 'GET')
      }

      const data: BlogFull = (await app.$api(params)).data

      return {
        post: data
      }
    } catch (err) {
      app.$sentry.captureException(err)
      console.error(err)
      return {
        post: {
          id: -1,
          title_en: 'string',
          title_ru: 'string',
          slug: 'string',
          excerpt_en: 'string',
          excerpt_ru: 'string',
          created_at: 'string',
          updated_at: 'string',
          thumbnail: null,
          content_en: '',
          content_ru: ''
        }
      }
    }
  }
}
</script>
