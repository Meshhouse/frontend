<template>
  <div class="embed-card">
    <img
      class="image__background"
      :src="model.images.length > 0 ? model.images[0].original : model.thumbnail"
      loading="lazy"
    >
    <div class="card__content">
      <div class="image__outer">
        <img
          class="image__inner"
          :src="model.thumbnail"
          :alt="model.title"
          loading="lazy"
        >
      </div>
      <div class="card__aside">
        <div class="card__header">
          <h1 class="title">
            {{ model.title }}
          </h1>
          <div class="tag-group">
            <div
              v-if="model.brands.length > 0"
              class="tag tag--icon tag--warning"
              :title="translations[routeLang].brands"
            >
              <font-awesome-icon icon="exclamation" />
            </div>
            <div
              v-if="model.mature_content"
              class="tag tag--icon tag--onlyfans"
              :title="translations[routeLang].mature"
            >
              <font-awesome-icon icon="venus" />
            </div>
          </div>
        </div>
        <div class="card__center">
          <div class="tag-group">
            <div
              v-for="(tag, idx) in model.tags"
              :key="`tag-${idx}`"
              class="tag tag--primary"
            >
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="card__footer">
          <div class="card__programs">
            <div
              v-for="(program, idx) in getUniquePrograms(model.files)"
              :key="`program-${idx}`"
            >
              <img
                class="icon"
                :src="`/icons/programs/${getProgramIcon(program)}.svg`"
                :title="getProgramIcon(program)"
              >
            </div>
          </div>
          <a
            :href="generateLink"
            class="card__button"
            target="_blank"
          >
            {{ translations[routeLang].embed.button }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import type {
  ModelFull
} from '@meshhouse/types'

import type { NuxtApp } from '@nuxt/types/app'
import type { Route } from 'vue-router'

@Component({
  layout: 'embed',
  head () {
    return {
      titleTemplate: undefined
    }
  }
})

export default class EmbedCard extends Vue {
  translations: any = {
    en: {
      brands: 'To use the content you need permission from the copyright holders',
      mature: 'Mature content',
      embed: {
        button: 'Show on Meshhouse'
      }
    },
    ru: {
      brands: 'Для использования контента необходимо разрешение от правообладателей',
      mature: 'Контент для взрослых',
      embed: {
        button: 'Посмотреть на Meshhouse'
      }
    }
  }

  model: ModelFull = {
    id: -1,
    title_en: 'string',
    title_ru: 'string',
    slug: 'string',
    description_en: 'string',
    description_ru: 'string',
    textures_link: '',
    is_mature_content: false,
    polygons: 5000,
    vertices: 25000,
    blendshapes: false,
    textures: 'procedural',
    hair_system: 'standard',
    uv: false,
    rig: 'bones',
    created_at: '0',
    updated_at: '0',
    files: [],
    tags_en: [],
    tags_ru: [],
    brands: [],
    related_models: [],
    thumbnail: '',
    images: [],
    thumbnail_images: [],
    preview: null,
    mature_content: false,
    install_paths: {
      models: '',
      textures: ''
    },
    licenses: [],
    collections: [],
    category: {
      id: -1,
      slug: '',
      icon: '',
      parent_id: null,
      created_at: '',
      updated_at: '',
      title_en: '',
      title_ru: '',
      description_en: '',
      description_ru: ''
    },
    filters: {}
  }

  async asyncData ({ app, route }: { app: NuxtApp, route: Route }): Promise<any> {
    try {
      const data: ModelFull = (await app.$api({
        method: 'GET',
        url: `models/${route.params.slug}`,
        headers: app.$generateAuthHeader(`models/${route.params.slug}`, 'GET')
      })).data

      return {
        model: data
      }
    } catch (err) {
      app.$sentry.captureException(err)
      console.error(err)
    }
  }

  get routeLang (): string {
    if (this.$route.query.lang === undefined || this.$route.query.lang === null || this.$route.query.lang === '') {
      return 'en'
    } else {
      return this.$route.query.lang.toString()
    }
  }

  getUniquePrograms (files: ModelFull['files']): string[] {
    const filteredPrograms = new Set(files.map((item: any) => item.program))
    return [...filteredPrograms]
  }

  getProgramIcon (program: string): string {
    switch (program) {
      case '3ds_max': {
        return '3dsmax'
      }
      case 'unreal_engine': {
        return 'unrealengine'
      }
      default: {
        return program
      }
    }
  }

  get generateLink (): string {
    const base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://meshhouse.art'
    return `${base}/models/${this.model.category.slug}/${this.model.slug}`
  }
}
</script>

<style lang="sass">
@import 'EmbedCard'
</style>
