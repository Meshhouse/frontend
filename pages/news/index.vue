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
    <div
      v-if="pagination.pages > 1"
      class="grid-container"
    >
      <pagination
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
import Pagination from '@/components/Pagination/Pagination.vue'
import PostCard from '@/components/PostCard/PostCard.vue'
import type {
  StrapiPagination,
  StrapiSimplePost,
  AxiosStrapiNewsQuery,
  AxiosStrapiNewsResponse
} from '@/types'

type NewsAsyncData = {
  posts: StrapiSimplePost[];
  pagination: StrapiPagination;
}

@Component<NewsList>({
  components: {
    Pagination,
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
  posts: StrapiSimplePost[] = []
  pagination: StrapiPagination = {
    pages: 0,
    count: 0
  }

  async asyncData ({ app, route }: { app: any, route: any }): Promise<NewsAsyncData> {
    try {
      const page = route.query.page ?? 1
      const params: AxiosStrapiNewsQuery = {
        method: 'GET',
        url: '/blog-posts',
        params: {
          page,
          count: 25
        }
      }

      const data: AxiosStrapiNewsResponse = (await app.$strapi(params)).data

      return {
        posts: data.items,
        pagination: data.pagination
      }
    } catch (err) {
      console.log(err)
      return {
        posts: [],
        pagination: {
          pages: 0,
          count: 0
        }
      }
    }
  }
}
</script>
