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
import PostCard from '@/components/PostCard/PostCard.vue'
import type { StrapiPost } from '~/types'

type NewsSingleAsyncData = {
  post: StrapiPost
}

@Component<NewsSingle>({
  components: {
    PostCard
  },
  head () {
    return {
      title: this.post[`title_${this.$i18n.locale}`]?.toString()
    }
  }
})

export default class NewsSingle extends Vue {
  post: StrapiPost = {
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

  async asyncData ({ app, route }: { app: any, route: any }): Promise<NewsSingleAsyncData> {
    try {
      const params = {
        method: 'GET',
        url: `/blog-posts/${route.params.slug}`
      }

      const data: StrapiPost = (await app.$strapi(params)).data

      return {
        post: data
      }
    } catch (err) {
      console.log(err)
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
