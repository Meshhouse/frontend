<template>
  <div>
    <breadcrumbs :elements="breadcrumbsElements" />
    <model-slider :model="model" />
    <header class="grid-container grid-container--model-header">
      <h1 class="display-text display-text--h3">
        <span>{{ model.title }}</span>
      </h1>
      <div class="button-group">
        <v-button
          color="primary"
          icon
          size="lg"
          :active="statistics.user_liked"
          :disabled="!$isLogged()"
          @click="likeModel"
        >
          <font-awesome-icon icon="thumbs-up" />
          <span>
            Recommend ({{ statistics.likes }})
          </span>
        </v-button>
        <v-button
          color="primary"
          icon
          size="lg"
          :active="isInFavorite"
          @click="$store.dispatch('changeFavorite', model.id)"
        >
          <font-awesome-icon icon="heart" />
        </v-button>
        <v-dropdown-button
          prepend-icon="share-alt"
          :title="$t('models.buttons.share')"
          :width="300"
          icon-only
          no-caret
        >
          <template slot="content">
            <p class="dropdown__header">
              {{ $t('models.buttons.share_content.link') }}
            </p>
            <p class="dropdown__item">
              <input class="input" type="text" :value="embedLink" readonly>
            </p>
            <p class="dropdown__header">
              {{ $t('models.buttons.share_content.iframe') }}
            </p>
            <p class="dropdown__item">
              <textarea class="input" type="text" :value="embedCode" readonly />
            </p>
          </template>
        </v-dropdown-button>
        <v-dropdown-button
          prepend-icon="cloud-download-alt"
          :title="$t('models.buttons.model')"
          :width="300"
          :disabled="model.files.length === 0"
          icon-only
          no-caret
        >
          <template slot="content">
            <p class="dropdown__header">
              {{ $t('models.buttons.textures_title') }}
            </p>
            <a
              class="dropdown__item"
              :href="model.textures_link"
              :disabled="model.textures_link === ''"
            >
              {{ $t('models.buttons.textures') }} ({{ getReadableFileSizeString(model.textures_link_size || 0) }})
            </a>
            <p class="dropdown__header">
              {{ $t('models.buttons.model_title') }}
            </p>
            <a
              v-for="(file, idx) in model.files"
              :key="`model-${idx}`"
              class="dropdown__item"
              :href="file.url"
              @click="$store.dispatch('downloadModelEvent', { id: model.id, fileId: file.id })"
            >
              {{ getDccName(file.program) }} {{ file.program_version }} - {{ getRendererName(file.renderer) }} {{ file.renderer_version }} ({{ getReadableFileSizeString(file.size || 0) }})
              <span class="badge badge--primary" style="margin-left: 0.5rem">
                <font-awesome-icon icon="chart-line" />
                {{ statistics.downloads[file.id] || 0 }}
              </span>
            </a>
          </template>
        </v-dropdown-button>
        <v-button
          v-if="model.files.length > 0"
          :href="`meshhouse://install/meshhouse/MSH-${model.id}`"
          color="primary"
          size="lg"
          icon
        >
          <img src="/icons/logo-icon.svg" alt="Meshhouse" class="svg-inline--fa fa-meshhouse">
          <span>
            {{ $t('models.buttons.install') }}
          </span>
        </v-button>
      </div>
    </header>
    <main class="grid-container grid-container--model-description">
      <div class="model__description">
        <vue-alert
          v-if="model.brands.length > 0"
          type="warning"
          :title="$t('models.alerts.legal_notice.title')"
        >
          {{ $t('models.alerts.legal_notice.text', { brand: getStringedArray(model.brands) }) }}
        </vue-alert>
        <vue-alert
          v-if="model.is_mature_content"
          type="onlyfans"
          :title="$t('license.matureContent')"
        >
          {{ $t('models.alerts.mature_content.title') }}
        </vue-alert>
        <div
          v-if="model.description !== ''"
          class="description"
          v-html="model.description"
        />
      </div>
      <aside>
        <h5 class="display-text display-text--h5">
          <span>Available licenses</span>
        </h5>
        <div class="licenses">
          <license-block
            v-for="license in currentLicenses"
            :key="license.id"
            :license="license"
          />
        </div>
        <h5 class="display-text display-text--h5">
          <span>Product info</span>
        </h5>
        <model-specifications :model="model" />
        <model-custom-specifications
          v-if="categoryFilters.length > 0"
          :model="model"
          :filters="categoryFilters"
        />
        <banner
          v-if="currentBanner.visible && $shouldWatchBanners()"
          :type="currentBanner.type"
          size="model"
          :href="currentBanner.href"
          :image-content="currentBanner.image"
          :script-content="currentBanner.script"
        />
      </aside>
    </main>
    <div class="grid-container">
      <div v-if="Array.isArray(model.tags) && model.tags.length > 0">
        <h3 class="display-text display-text--h3">
          <span>
            {{ $t('models.information.tags') }}
          </span>
        </h3>
        <div class="tag-group">
          <vue-tag
            v-for="(tag, idx) in model.tags"
            :key="`tag-${idx}`"
            :tag="tag"
          />
        </div>
      </div>
    </div>
    <ModelsSlider
      v-for="collection in currentCollections"
      :key="collection.id"
      :models="collection.items"
      :title="collection.title"
    />
    <ModelsSlider
      v-if="similarModels.length > 0"
      :models="similarModels"
      :title="$t('models.similar.title', { model: model.title || '' })"
    />
    <ModelsSliderByCategory
      v-if="modelAccessories.categories.length > 0"
      :accessories="modelAccessories"
      :title="$t('models.accessories.title')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LazyHydrate from 'vue-lazy-hydration'
import type {
  ModelFull,
  License,
  CategoryFilter,
  ModelSimple,
  ModelAccessories
} from '@meshhouse/types'
import type { NuxtApp } from '@nuxt/types/app'
import { format } from 'date-fns'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import VueTag from '@/components/common/Tag/Tag.vue'
import ModelSlider from '@/components/ModelSlider/ModelSlider.vue'
import VueAlert from '@/components/Alert/Alert.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import LicenseBlock from '@/components/License/License.vue'
import ModelSpecifications from '@/components/ModelSpecifications/ModelSpecifications.vue'
import ModelCustomSpecifications from '@/components/ModelSpecifications/ModelCustomSpecifications.vue'
import ModelsSlider from '@/components/ModelsSlider/ModelsSlider.vue'
import ModelsSliderByCategory from '@/components/ModelsSlider/ModelsSliderByCategory.vue'

import type {
  CollectionWithModels
} from '@/types'

import {
  getDccName,
  getRendererName,
  getStringedArray,
  getReadableFileSizeString
} from '@/functions/helpers'

@Component<ModelSinglePage>({
  components: {
    Breadcrumbs,
    LazyHydrate,
    ModelCard,
    ModelSlider,
    ModelSpecifications,
    ModelCustomSpecifications,
    VueAlert,
    VueTag,
    LicenseBlock,
    ModelsSlider,
    ModelsSliderByCategory
  },
  head () {
    const ogMetas = []

    for (const key in this.tags.og) {
      ogMetas.push({ content: this.tags.og[key], property: key })
    }

    return {
      title: this.tags.title,
      description: this.tags.description,
      meta: [
        ...ogMetas,
        { content: this.tags.meta.name, itemprop: 'name' },
        { content: this.tags.meta.description, itemprop: 'description' },
        { content: this.tags.meta.image, itemprop: 'image' },
        { content: this.tags.meta.sku, itemprop: 'sku' }
      ]
    }
  },
  methods: {
    format,
    getDccName,
    getRendererName,
    getStringedArray,
    getReadableFileSizeString
  }
})

export default class ModelSinglePage extends Vue {
  model: ModelFull = {
    id: -1,
    title_en: 'string',
    title_ru: 'string',
    slug: 'string',
    category: {
      id: -1,
      icon: '',
      parent_id: null,
      slug: 'string',
      title_en: 'string',
      title_ru: 'string',
      description_en: '',
      description_ru: '',
      created_at: '',
      updated_at: ''
    },
    description_en: 'string',
    description_ru: 'string',
    textures_link: '',
    is_mature_content: false,
    polygons: 0,
    vertices: 0,
    blendshapes: false,
    hair_system: false,
    textures: 'procedural',
    uv: false,
    rig: 'bones',
    created_at: '0',
    updated_at: '0',
    files: [],
    tags_en: [],
    tags_ru: [],
    brands: [],
    thumbnail: '',
    images: [],
    preview: null,
    mature_content: false,
    install_paths: {
      textures: '',
      models: ''
    },
    licenses: [],
    collections: [],
    filters: {}
  }

  tags: { [key: string]: any } = {
    og: {
      'og:title': '',
      'og:type': 'product',
      'og:description': '',
      'og:image': '',
      'og:image:width': '',
      'og:image:height': '',
      'og:site_name': 'MeshHouse',
      'og:availability': 'instock',
      'product:price:amount': '0',
      'product:price:currency': 'USD'
    },
    meta: {
      name: '',
      description: '',
      image: '',
      sku: ''
    },
    title: '',
    description: ''
  }

  currentBanner: any = {
    visible: false,
    type: 'static',
    href: '#',
    image: 'https://fakeimg.pl/300x250/',
    alt: 'Test banner'
  }

  statistics: Record<string, number | boolean | Record<string, number>> = {
    views: 0,
    likes: 0,
    user_liked: false,
    downloads: {}
  }

  currentLicenses: License[] = []

  currentCollections: CollectionWithModels[] = []

  similarModels: ModelSimple[] = []

  modelAccessories: ModelAccessories = {
    categories: [],
    models: {}
  }

  categoryFilters: CategoryFilter[] = []

  loading = false

  async asyncData ({ app, route, store, error }: { app: NuxtApp, route: any, store: any, error: any }): Promise<any> {
    try {
      const data: ModelFull = (await app.$api({
        method: 'GET',
        url: `models/${route.params.slug}`,
        headers: app.$generateAuthHeader(`models/${route.params.slug}`, 'GET')
      })).data

      const currentLicenses: License[] = store.state.licenses.filter((license: License) => data.licenses.includes(license.id))

      const [
        categoryFilters,
        SEO,
        statistics
      ] = await Promise.all([
        app.$api.request<CategoryFilter[]>({
          method: 'GET',
          url: `categories/${data.category.id}/filters`,
          headers: {
            ...app.$generateAuthHeader(`categories/${data.category.id}/filters`, 'GET')
          }
        }).then(res => res.data),
        app.$api.request<any>({
          method: 'GET',
          url: `seo/models/${route.params.slug}`,
          headers: {
            ...app.$generateAuthHeader(`seo/models/${route.params.slug}`, 'GET')
          }
        }).then(res => res.data),
        app.$api.request<any>({
          method: 'POST',
          url: 'statistics/model-single',
          data: {
            ids: [data.id]
          },
          headers: {
            ...app.$generateAuthHeader('statistics/model-single', 'POST')
          }
        }).then(res => res.data)
      ])
      // Check for valid category and slug in route params
      if (route.params.category !== data.category.slug || route.params.slug !== data.slug) {
        error({
          statusCode: 404,
          message: 'Post not found'
        })
      }

      return {
        model: data,
        currentLicenses,
        categoryFilters: categoryFilters.filter(filter => filter.id),
        tags: SEO,
        statistics
      }
    } catch (err) {
      app.$sentry.captureException(err)
      console.error(err)
      error({
        statusCode: 404,
        message: 'Post not found'
      })
    }
  }

  get embedLink (): string {
    const base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://meshhouse.art'
    return `${base}/embed/card/${this.model.slug}`
  }

  get embedCode (): string {
    return `<iframe src="${this.embedLink}" name="meshhouse-embed" height="360px" width="100%" sandbox="allow-popups allow-scripts" loading="lazy" style="border: none;"></iframe>`
  }

  get isInFavorite (): boolean {
    return this.$store.state.favorites.find((item: number) => item === this.model.id) !== undefined
  }

  get breadcrumbsElements (): Record<string, string | boolean>[] {
    return [
      {
        title: this.$t('navigation.home').toString(),
        href: '/'
      },
      {
        title: this.$t('navigation.modelsCatalog').toString(),
        href: '/models'
      },
      {
        title: this.model.category.title || '',
        href: `/models/${this.model.category.slug}`
      },
      {
        title: this.model.title || '',
        href: `/models/${this.model.category.slug}/${this.model.slug}`,
        active: true
      }
    ]
  }

  mounted (): void {
    setTimeout(() => this.$store.dispatch('viewModelEvent', { id: this.model.id }), 3000)
    this.loadModelInfo()
  }

  async likeModel (): Promise<void> {
    try {
      await this.$store.dispatch('likeModelEvent', { id: this.model.id })

      const statistics = (await this.$api.request<any>({
        method: 'POST',
        url: 'statistics/model-single',
        data: {
          ids: [this.model.id]
        },
        headers: {
          ...this.$generateAuthHeader('statistics/model-single', 'POST')
        }
      })).data

      this.statistics = statistics
    } catch (error) {}
  }

  async loadModelInfo (): Promise<void> {
    try {
      this.loading = true
      const [
        modelsCollections,
        similarModels,
        modelAccessories
      ] = await Promise.allSettled([
        this.$api.request<any>({
          method: 'POST',
          url: 'models/collection',
          data: {
            ids: this.model.collections.map(collection => collection.id)
          },
          headers: this.$generateAuthHeader('models/collection', 'POST')
        }).then(res => res.data).catch(() => null),
        this.$api.request<ModelSimple[]>({
          method: 'GET',
          url: `models/similar/${this.model.slug}`,
          headers: {
            ...this.$generateAuthHeader(`models/similar/${this.model.slug}`, 'GET')
          }
        }).then(res => res.data).catch(() => null),
        this.$api.request<ModelAccessories>({
          method: 'GET',
          url: `models/accessories/${this.model.slug}`,
          headers: {
            ...this.$generateAuthHeader(`models/accessories/${this.model.slug}`, 'GET')
          }
        }).then(res => res.data).catch(() => null)
      ])

      if (modelsCollections.status === 'fulfilled' && modelsCollections.value) {
        this.currentCollections = this.model.collections
          .filter(collection => Array.isArray(modelsCollections.value[collection.id]) && modelsCollections.value[collection.id].length > 0)
          .map((collection) => {
            return {
              ...collection,
              items: modelsCollections.value[collection.id]
            }
          })
      }

      if (similarModels.status === 'fulfilled' && similarModels.value) {
        this.similarModels = similarModels.value
      }

      if (modelAccessories.status === 'fulfilled' && modelAccessories.value) {
        this.modelAccessories = modelAccessories.value
      }
    } catch (err) {
      this.$sentry.captureException(err)
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>
