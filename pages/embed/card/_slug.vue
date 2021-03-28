<template>
  <div class="embed-card">
    <img
      class="image__background"
      :src="getImageUrl(model.images[0] || model.thumbnail)"
      loading="lazy"
    >
    <div class="card__content">
      <div class="image__outer">
        <img
          class="image__inner"
          :src="getImageUrl(model.thumbnail)"
          :alt="model[`title_${routeLang}`]"
          loading="lazy"
        >
      </div>
      <div class="card__aside">
        <div class="card__header">
          <h1 class="title">
            {{ model[`title_${routeLang}`] }}
          </h1>
          <div class="tag-group">
            <div
              class="tag tag--icon tag--warning"
              :title="translations[routeLang].brands"
            >
              <font-awesome-icon icon="exclamation" />
            </div>
            <div
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
              {{ tag[`title_${$route.query.lang || 'en'}`] }}
            </div>
          </div>
        </div>
        <div class="card__footer">
          <div class="card__programs">
            <div
              v-for="(program, idx) in getUniquePrograms(model.model_links)"
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
import type { StrapiModel } from '@/types'

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

  model: StrapiModel = {
    id: -1,
    title_en: 'string',
    title_ru: 'string',
    slug: 'string',
    category: {
      slug: 'string',
      title_en: 'string',
      title_ru: 'string'
    },
    description_en: 'string',
    description_ru: 'string',
    textures_link: null,
    is_mature_content: false,
    available_formats: [],
    model_information: {
      polygons: '5000',
      vertices: '25000',
      blendshapes: false,
      rigged: false,
      hair_system: false,
      textures_type: 'procedural',
      hair_system_type: 'standard',
      uv_maps: false,
      uv_maps_type: 'generated',
      rig_type: 'bones'
    },
    created_at: '0',
    updated_at: '0',
    model_links: [],
    tags: [],
    brands: [],
    related_models: [],
    thumbnail: null,
    images: [],
    thumbnail_images: [],
    preview: null
  }

  async asyncData ({ app, route }: { app: any, route: any }): Promise<any> {
    try {
      const data: StrapiModel = (await app.$strapi({
        method: 'GET',
        url: `/models/${route.params.slug}`
      })).data

      return {
        model: data
      }
    } catch (err) {
      console.log(err)
    }
  }

  get routeLang (): string {
    return this.$route.query.lang !== null ? this.$route.query.lang.toString() : 'en'
  }

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }

  getUniquePrograms (programs: any[]): string[] {
    const filteredPrograms = new Set(programs.map((item: any) => item.program))
    return [...filteredPrograms]
  }

  getProgramIcon (program: string): string {
    switch (program) {
      case 'autodesk_3ds_max': {
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
    return `${base}/models/view/${this.model.slug}`
  }
}
</script>

<style lang="sass">
@import 'EmbedCard'
</style>
