<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('news.title') }}
          </span>
        </h1>
      </header>
    </div>
    <div class="grid-container grid-container--posts">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :item="post"
      />
    </div>
    <div class="grid-container">
      <paginator
        :pagination="pagination"
        base-url="news"
        param=""
      />
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "news": {
      "title": "News"
    }
  },
  "ru": {
    "news": {
      "title": "Новости"
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Paginator from '@/components/Pagination/Pagination.vue'
import PostCard from '@/components/PostCard/PostCard.vue'

import type {
  Pagination,
  WithPagination
} from '@/types/api/'

import type {
  BlogSimple
} from '@/types/api/posts'

import type { NuxtApp } from '@nuxt/types/app'
import type { Route } from 'vue-router'
import type { AxiosRequestConfig } from 'axios'

@Component<NewsList>({
  components: {
    Paginator,
    PostCard
  },
  head () {
    return {
      title: this.$t('news.title').toString()
    }
  },
  watchQuery: [
    'page'
  ]
})

export default class NewsList extends Vue {
  posts: BlogSimple[] = []
  pagination: Pagination = {
    total: 0,
    current_page: 1,
    last_page: 1
  }

  async asyncData ({ app, route }: { app: NuxtApp, route: Route }): Promise<any> {
    try {
      const page = route.query.page ?? 1
      const params: AxiosRequestConfig = {
        method: 'GET',
        url: 'posts',
        params: {
          page,
          count: 25
        },
        headers: app.$generateAuthHeader('posts', 'GET')
      }

      const data: WithPagination<BlogSimple[]> = (await app.$api(params)).data

      return {
        posts: data.items,
        pagination: data.pagination
      }
    } catch (err) {
      console.log(err)
      return {
        posts: [],
        pagination: {
          total: 0,
          current_page: 1,
          last_page: 1
        }
      }
    }
  }
}
</script>
