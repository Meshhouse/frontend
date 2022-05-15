<template>
  <main class="layout layout--models">
    <div class="models-content">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ currentCategory[`title_${$i18n.locale}`] }}
          </span>
        </h1>
        <p class="models-count">
          {{ $tc('models-count', pagination.total) }}
        </p>
      </header>
      <div class="models-cards">
        <model-card
          v-for="model in items"
          :key="model.id"
          :item="model"
        />
      </div>
      <div
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
    <aside class="models-filters">
      <accordion
        v-for="categoryFilter in categoryFilters"
        :key="categoryFilter.key"
        class="mb-2"
        :selected="checkSelectedAccordion(categoryFilter, selectedFilters[categoryFilter.key])"
      >
        <template slot="header">
          {{ categoryFilter[`title_${$i18n.locale}`] }}
        </template>
        <template v-if="categoryFilter.type === 'radio'">
          <radio-button
            v-for="filterValue in categoryFilter.values"
            :key="filterValue.value"
            v-model="selectedFilters[categoryFilter.key]"
            :value="filterValue.value"
          >
            {{ filterValue[`title_${$i18n.locale}`] }}
          </radio-button>
        </template>
        <template v-if="categoryFilter.type === 'checkbox'">
          <checkbox
            v-for="filterValue in categoryFilter.values"
            :key="filterValue.value"
            v-model="selectedFilters[categoryFilter.key]"
            :value="filterValue.value"
          >
            {{ filterValue[`title_${$i18n.locale}`] }}
          </checkbox>
        </template>
        <template v-if="categoryFilter.type === 'checkbox-color'">
          <checkbox
            v-for="filterValue in categoryFilter.values"
            :key="filterValue.value"
            v-model="selectedFilters[categoryFilter.key]"
            :value="filterValue.value"
            :color="filterValue.color"
          >
            {{ filterValue[`title_${$i18n.locale}`] }}
          </checkbox>
        </template>
        <template v-if="categoryFilter.type === 'range'">
          <range-input
            v-model="selectedFilters[categoryFilter.key]"
            :ranges="categoryFilter.values[0]"
          />
        </template>
      </accordion>
      <v-button
        color="primary"
        :disabled="loading"
        @click="handleSubmit"
      >
        {{ $t('filters.submit') }}
      </v-button>
    </aside>
  </main>
</template>

<i18n>
{
  "en": {
    "models-count": "0 models | 1 model | {n} models",
    "filters": {
      "submit": "Submit"
    }
  },
  "ru": {
    "models-count": "0 моделей | {n} модель | {n} модели | {n} моделей",
    "filters": {
      "submit": "Отправить"
    }
  }
}
</i18n>

<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import qs from 'qs'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import Accordion from '@/components/Accordion/Accordion.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import RangeInput from '@/components/RangeInput/RangeInput.vue'
import RadioButton from '@/components/RadioButton/RadioButton.vue'

import { AxiosRequestConfig } from 'axios'
import type { Route } from 'vue-router'

import {
  prepareFilters,
  prepareCustomFilters,
  recursiveFindObject
} from '@/functions/helpers'

import type {
  CategoryTreeItem,
  CategoryFilter
} from '@/types/api/categories'

import type {
  ModelSimple
} from '@/types/api/models'

import type {
  WithPagination
} from '@/types/api'

import type { NuxtApp } from '@nuxt/types/app'

type ModelCatalogCurrentCategory = {
  [key: string]: string;
  title_en: string;
  title_ru: string;
}

@Component<ModelCatalog>({
  components: {
    Accordion,
    Checkbox,
    ModelCard,
    Pagination,
    RangeInput,
    RadioButton
  },
  head () {
    return {
      title: this.currentCategory[`title_${this.$i18n.locale}`]
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

  async asyncData ({ store, app, route }: { store: any, app: NuxtApp, route: Route }): Promise<any> {
    try {
      const categories: number[] = []
      const querystring = route.fullPath.split('?')[1]
      const query = qs.parse(querystring)

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
        app.$api.request<WithPagination<ModelSimple[]>>({
          method: 'POST',
          url: 'models',
          data: {
            filters,
            page: 1,
            count: 48,
            categories,
            query: route.query.q
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
      const categoryFilters = promises[1].data

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
          selectedFilters[filter.key] = [filter.values[0].min, filter.values[0].max]
        }
      })

      return {
        items: data.items,
        pagination: data.pagination,
        selectedFilters,
        categoryFilters
      }
    } catch (err) {
      console.log(err)
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
      return {
        title_en: `Models with tag '${this.$route.query.tag}'`,
        title_ru: `Модели с тегом '${this.$route.query.tag}'`
      }
    }

    if (this.$route.query.q !== undefined) {
      return {
        title_en: `Search results for '${this.$route.query.q}'`,
        title_ru: `Результаты по запросу '${this.$route.query.q}'`
      }
    }

    return recursiveFindObject(this.$store.state.categories, 'slug', 'childrens', this.$route.params.category) ?? {
      title_en: 'All models',
      title_ru: 'Все модели'
    }
  }

  checkSelectedAccordion (filter: CategoryFilter, value: any) {
    if (filter.type === 'checkbox' || filter.type === 'checkbox-color') {
      return value.length > 0
    }
    if (filter.type === 'radio') {
      return filter.key !== 'mature_content'
        ? value !== 'all'
        : value !== 'false'
    }
    if (filter.type === 'range') {
      return value[0] !== filter.values[0].min || value[1] !== filter.values[0].max
    }

    return false
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
          query: this.$route.query.q
        },
        headers: {
          ...this.$generateAuthHeader('models', 'POST'),
          'x-meshhouse-mature-content': this.selectedFilters.mature_content
        }
      }


      const data: WithPagination<ModelSimple[]> = (await this.$api(params)).data

      const querystring = qs.stringify({
        page: this.pagination.current_page > 1 ? this.pagination.current_page : undefined,
        ...prepared.simplified,
        mature: this.selectedFilters.mature_content === 'true' ? true : undefined,
        q: this.$route.query.q ? this.$route.query.q : undefined
      }, { encode: false })

      this.items = data.items
      this.pagination = data.pagination

      this.$router.push(`${this.$route.path}?${querystring}`)
    } catch (err) {
      console.log(err)
    } finally {
      this.loading = false
    }
  }
}
</script>
