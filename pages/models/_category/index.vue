<template>
  <main class="layout layout--models">
    <div class="models-content">
      <header class="layout__header">
        <banner
          v-if="currentBanner.visible && $shouldWatchBanners()"
          :type="currentBanner.type"
          size="category"
          :href="currentBanner.href"
          :image-content="currentBanner.image"
          :script-content="currentBanner.script"
        />
        <div class="layout__header-wrapper">
          <h1 class="display-text display-text--h2">
            <span>
              {{ currentCategory.title }}
            </span>
          </h1>
          <p class="models-count">
            {{ $tc('common["models-count"]', pagination.total) }}
          </p>
        </div>
      </header>
      <model-filters-overlay
        v-model="selectedFilters"
        :category-filters="categoryFilters"
        :loading="loading"
        :sorting.sync="sorting"
        @update:sorting="handleSubmit"
        @submit="handleSubmit"
      />
      <div
        v-if="items.length > 0"
        class="models-cards"
      >
        <model-card
          v-for="model in items"
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
      <div
        v-if="items.length > 0"
        class="grid-container models-pagination"
        style="margin-top: auto"
      >
        <pagination
          :pagination="pagination"
          base-url="models"
          :param="$route.params.category"
        />
      </div>
    </div>
    <model-filters
      v-model="selectedFilters"
      :category-filters="categoryFilters"
      :loading="loading"
      @submit="handleSubmit"
    />
  </main>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import {
  parse as qsParse,
  stringify as qsStringify
} from 'qs'
import { AxiosRequestConfig } from 'axios'
import type { Route } from 'vue-router'
import type { NuxtApp } from '@nuxt/types/app'
import type {
  CategoryFilter,
  ModelSimple,
  WithPagination,
  CategoryFilterValueRange
} from '@meshhouse/types'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import ModelFilters from '@/components/Model/ModelFilters/ModelFilters.vue'
import ModelFiltersOverlay from '@/components/Model/ModelFiltersOverlay/ModelFiltersOverlay.vue'

import {
  prepareFilters,
  prepareCustomFilters,
  recursiveFindObject
} from '@/functions/helpers'

import type {
  CategoryTreeItem
} from '@/types'


type ModelCatalogCurrentCategory = {
  title: string;
}

@Component<ModelCatalog>({
  components: {
    ModelCard,
    Pagination,
    ModelFilters,
    ModelFiltersOverlay
  },
  head () {
    return {
      title: this.currentCategory.title
    }
  }
})

export default class ModelCatalog extends Vue {
  items: ModelSimple[] = []
  pagination = {
    current_page: 1,
    last_page: 1,
    total: 0
  }

  loading = false

  categoryFilters: CategoryFilter[] = []
  selectedFilters: any = {
    formats: [],
    renderers: [],
    polys: 'all',
    hair: 'all',
    rig: 'all',
    textures: 'all',
    uv: 'all',
    mature_content: 'false'
  }

  currentBanner: any = {
    visible: false,
    type: 'static',
    href: '#',
    image: 'https://fakeimg.pl/970x90/',
    alt: 'Test banner'
  }

  sorting = 'created_at:desc'

  async asyncData ({ store, app, route }: { store: any, app: NuxtApp, route: Route }): Promise<any> {
    try {
      const categories: number[] = []
      const querystring = route.fullPath.split('?')[1]
      const query = qsParse(querystring)

      const matureContent = query.mature ?? false
      const selectedFileFormats: string [] = (query.f as string[]) || []
      const selectedRenderers: string [] = (query.r as string[]) || []
      const selectedPolyFilter: string = (query.ps as string) || 'all'
      const selectedHairFilter: string = (query.hs as string) || 'all'
      const selectedRiggingFilter: string = (query.rig as string) || 'all'
      const selectedTexturesFilter: string = (query.tx as string) || 'all'
      const selectedUVFilter: string = (query.uv as string) || 'all'

      const filters = prepareFilters({
        formats: selectedFileFormats,
        renderers: selectedRenderers,
        polys: selectedPolyFilter,
        hair: selectedHairFilter,
        rig: selectedRiggingFilter,
        textures: selectedTexturesFilter,
        uv: selectedUVFilter,
        mature_content: matureContent
      }, store.state.categoryFilters).original

      const category: CategoryTreeItem | undefined = await store.dispatch('findCategoryBySlug', route.params.category)
      if (category) {
        categories.push(category.id)
        if (category.childrens) {
          for (const child of category.childrens) {
            categories.push(child.id)
          }
        }
      }

      const promises = await Promise.all([
        app.$api.request<WithPagination<ModelSimple>>({
          method: 'POST',
          url: 'models',
          data: {
            filters,
            page: 1,
            count: 48,
            categories,
            query: route.query.q,
            tags: route.query.tag ? [route.query.tag] : undefined,
            sort: {
              field: 'created_at',
              direction: 'desc'
            }
          },
          headers: {
            ...app.$generateAuthHeader('models', 'POST'),
            'x-meshhouse-mature-content': matureContent
          }
        }),
        app.$api.request<CategoryFilter[]>({
          method: 'GET',
          url: `categories/${category?.id || null}/filters`,
          headers: {
            ...app.$generateAuthHeader(`categories/${category?.id || null}/filters`, 'GET')
          }
        })
      ])

      const data = promises[0].data
      const categoryFilters = promises[1].data.filter(filter => filter.visible === undefined || filter.visible === true)

      const selectedFilters: any = {
        formats: selectedFileFormats,
        renderers: selectedRenderers,
        polys: selectedPolyFilter,
        hair: selectedHairFilter,
        rig: selectedRiggingFilter,
        textures: selectedTexturesFilter,
        uv: selectedUVFilter,
        mature_content: matureContent ? 'true' : 'false'
      }

      // eslint-disable-next-line array-callback-return
      categoryFilters.map((filter) => {
        if (selectedFilters[filter.key] !== undefined) {
          return false
        }

        if (filter.type !== 'radio' && filter.type !== 'range') {
          selectedFilters[filter.key] = []
        } else if (filter.type === 'radio') {
          selectedFilters[filter.key] = 'all'
        } else if (filter.type === 'range') {
          const values = filter.values[0] as CategoryFilterValueRange
          selectedFilters[filter.key] = [values.min, values.max]
        }
      })

      const statistics = await app.$api.request<{[key: string]: Record<string, number>}>({
        method: 'POST',
        url: 'statistics/models',
        data: {
          ids: data.items.map(item => item.id)
        },
        headers: app.$generateAuthHeader('statistics/models', 'POST')
      })

      const items = data.items.map((item) => {
        return {
          ...item,
          statistics: statistics.data[item.id] ?? {
            views: 0,
            likes: 0,
            downloads: 0
          }
        }
      })

      return {
        items,
        pagination: data.pagination,
        selectedFilters,
        categoryFilters
      }
    } catch (err) {
      app.$sentry.captureException(err)
      console.error(err)
      return {
        items: [],
        pagination: {
          current_page: 1,
          last_page: 1,
          total: 0
        }
      }
    }
  }

  get currentCategory (): ModelCatalogCurrentCategory {
    if (this.$route.query.tag !== undefined) {
      const titles: any = {
        title_en: `Models with tag '${this.$route.query.tag}'`,
        title_ru: `Модели с тегом '${this.$route.query.tag}'`
      }
      return { title: titles[`title_${this.$i18n.locale}`] }
    }

    if (this.$route.query.q !== undefined) {
      const titles: any = {
        title_en: `Search results for '${this.$route.query.q}'`,
        title_ru: `Результаты по запросу '${this.$route.query.q}'`
      }

      return { title: titles[`title_${this.$i18n.locale}`] }
    }

    const titles: any = {
      title_en: 'All models',
      title_ru: 'Все модели'
    }

    return recursiveFindObject(this.$store.state.categories, 'slug', 'childrens', this.$route.params.category) ?? {
      title: titles[`title_${this.$i18n.locale}`]
    }
  }

  @Watch('$route.query')
  queryWatcher (query: any, oldQuery: any) {
    if (query.q !== oldQuery.q) {
      this.handleSubmit()
    }
  }

  async handleSubmit (): Promise<void> {
    const categories: number[] = []
    const prepared = prepareFilters(this.selectedFilters, this.categoryFilters)
    const customFilters = prepareCustomFilters(this.selectedFilters, this.categoryFilters)
    const filters = prepared.original

    const category: CategoryTreeItem | undefined = await this.$store.dispatch('findCategoryBySlug', this.$route.params.category)
    if (category) {
      categories.push(category.id)
      if (category.childrens) {
        for (const child of category.childrens) {
          categories.push(child.id)
        }
      }
    }

    const sortingArr = this.sorting.split(':')

    try {
      this.loading = true

      const params: AxiosRequestConfig = {
        method: 'POST',
        url: 'models',
        data: {
          filters,
          custom_filters: customFilters.original,
          page: this.pagination.current_page,
          count: 48,
          categories,
          query: this.$route.query.q,
          tags: this.$route.query.tag ? [this.$route.query.tag] : undefined,
          sort: {
            field: sortingArr[0],
            direction: sortingArr[1]
          }
        },
        headers: {
          ...this.$generateAuthHeader('models', 'POST'),
          'x-meshhouse-mature-content': this.selectedFilters.mature_content
        }
      }


      const data: WithPagination<ModelSimple> = (await this.$api(params)).data

      const querystring = qsStringify({
        page: this.pagination.current_page > 1 ? this.pagination.current_page : undefined,
        ...prepared.simplified,
        mature: this.selectedFilters.mature_content === 'true' ? true : undefined,
        q: this.$route.query.q ? this.$route.query.q : undefined,
        tag: this.$route.query.tag ? this.$route.query.tag : undefined
      }, { encode: false })

      const statistics = await this.$api.request<{[key: string]: Record<string, number>}>({
        method: 'POST',
        url: 'statistics/models',
        data: {
          ids: data.items.map(item => item.id)
        },
        headers: this.$generateAuthHeader('statistics/models', 'POST')
      })

      const items = data.items.map((item) => {
        return {
          ...item,
          statistics: statistics.data[item.id]
            ? {
                views: statistics.data[item.id].views,
                likes: statistics.data[item.id].likes,
                downloads: statistics.data[item.id].downloads
              }
            : {
                views: 0,
                likes: 0,
                downloads: 0
              }
        }
      })

      this.items = items
      this.pagination = data.pagination

      this.$router.push(`${this.$route.path}?${querystring}`)
    } catch (err) {
      this.$sentry.captureException(err)
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>
