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
        class="mb-2"
        :counter="selectedFileFormats.length"
      >
        <template slot="header">
          {{ $t('filters.file.title') }}
        </template>
        <checkbox
          v-for="format in availableFileFormats"
          :key="format.value"
          v-model="selectedFileFormats"
          :value="format.value"
        >
          {{ format.text }}
        </checkbox>
      </accordion>
      <accordion
        class="mb-2"
        :counter="selectedRenderers.length"
      >
        <template slot="header">
          {{ $t('filters.renderer.title') }}
        </template>
        <checkbox
          v-for="format in availableRenderers"
          :key="format.value"
          v-model="selectedRenderers"
          :value="format.value"
        >
          {{ format.text }}
        </checkbox>
      </accordion>
      <accordion
        class="mb-2"
        :selected="selectedPolyFilter !== 'all'"
      >
        <template slot="header">
          {{ $t('filters.poly.title') }}
        </template>
        <radio-button
          v-for="format in polygonsFilter"
          :key="format.value"
          v-model="selectedPolyFilter"
          :value="format.value"
        >
          {{ format.text }}
        </radio-button>
      </accordion>
      <accordion
        class="mb-2"
        :selected="matureContent !== 'true'"
      >
        <template slot="header">
          {{ $t('filters.mature-content.title') }}
        </template>
        <radio-button
          v-for="format in matureContentFilter"
          :key="format.value"
          v-model="matureContent"
          :value="String(format.value)"
        >
          {{ format.text }}
        </radio-button>
      </accordion>
      <accordion
        class="mb-2"
        :selected="selectedHairFilter !== 'all'"
      >
        <template slot="header">
          {{ $t('filters.hair.title') }}
        </template>
        <radio-button
          v-for="format in hairFilter"
          :key="format.value"
          v-model="selectedHairFilter"
          :value="format.value"
        >
          {{ format.text }}
        </radio-button>
      </accordion>
      <accordion
        class="mb-2"
        :selected="selectedRiggingFilter !== 'all'"
      >
        <template slot="header">
          {{ $t('filters.rigging.title') }}
        </template>
        <radio-button
          v-for="format in riggingFilter"
          :key="format.value"
          v-model="selectedRiggingFilter"
          :value="format.value"
        >
          {{ format.text }}
        </radio-button>
      </accordion>
      <accordion
        class="mb-2"
        :selected="selectedTexturesFilter !== 'all'"
      >
        <template slot="header">
          {{ $t('filters.textures.title') }}
        </template>
        <radio-button
          v-for="format in texturesFilter"
          :key="format.value"
          v-model="selectedTexturesFilter"
          :value="format.value"
        >
          {{ format.text }}
        </radio-button>
      </accordion>
      <accordion
        class="mb-2"
        :selected="selectedUVFilter !== 'all'"
      >
        <template slot="header">
          {{ $t('filters.uv.title') }}
        </template>
        <radio-button
          v-for="format in texturesUVFilter"
          :key="format.value"
          v-model="selectedUVFilter"
          :value="format.value"
        >
          {{ format.text }}
        </radio-button>
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
      "file": {
        "title": "Model format"
      },
      "renderer": {
        "title": "Render engine"
      },
      "poly": {
        "title": "Polygons count",
        "any": "Any",
        "lowpoly": "Lesser than 1500",
        "midpoly": "From 1500 to 20000",
        "hipoly": "From 20000"
      },
      "mature-content": {
        "title": "Mature content",
        "true": "Yes",
        "false": "No"
      },
      "hair": {
        "title": "Hair system",
        "any": "Any"
      },
      "rigging": {
        "title": "Rigging",
        "any": "Any",
        "bones": "Bones system"
      },
      "textures": {
        "title": "Textures",
        "any": "Any",
        "procedural": "Procedural"
      },
      "uv": {
        "title": "Unwrapping"
      },
      "submit": "Submit"
    }
  },
  "ru": {
    "models-count": "0 моделей | {n} модель | {n} модели | {n} моделей",
    "filters": {
      "file": {
        "title": "Формат файла"
      },
      "renderer": {
        "title": "Движок рендеринга"
      },
      "poly": {
        "title": "Число полигонов",
        "any": "Любое",
        "lowpoly": "До 1500",
        "midpoly": "От 1500 до 20000",
        "hipoly": "От 20000"
      },
      "mature-content": {
        "title": "Контент для взрослых",
        "true": "Да",
        "false": "Нет"
      },
      "hair": {
        "title": "Система волос",
        "any": "Любая"
      },
      "rigging": {
        "title": "Риггинг",
        "any": "Любой",
        "bones": "Система костей"
      },
      "textures": {
        "title": "Текстуры",
        "any": "Любые",
        "procedural": "Процедурные"
      },
      "uv": {
        "title": "Развертка"
      },
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
import RadioButton from '@/components/RadioButton/RadioButton.vue'

import { AxiosRequestConfig } from 'axios'
import type { Route } from 'vue-router'

import {
  FORMAT_FILTERS,
  RENDERER_FILTERS,
  prepareFilters
} from '@/functions/helpers'

import type {
  CheckboxMultiSelect
} from '@/types'

import type {
  Category
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

  selectedFileFormats: string[] = []
  selectedRenderers: string[] = []
  selectedPolyFilter: string = 'all'
  selectedHairFilter: string = 'all'
  selectedRiggingFilter: string = 'all'
  selectedTexturesFilter: string = 'all'
  selectedUVFilter: string = 'all'
  matureContent: string | boolean = 'true'

  async asyncData ({ app, route }: { app: NuxtApp, route: Route }): Promise<any> {
    try {
      const querystring = route.fullPath.split('?')[1]
      const query = qs.parse(querystring)

      const matureContent = query.mature ?? true
      const selectedFileFormats: string [] = (query.f as string[]) || []
      const selectedRenderers: string [] = (query.r as string[]) || []
      const selectedPolyFilter: string = (query.ps as string) || 'all'
      const selectedHairFilter: string = (query.hs as string) || 'all'
      const selectedRiggingFilter: string = (query.rig as string) || 'all'
      const selectedTexturesFilter: string = (query.tx as string) || 'all'
      const selectedUVFilter: string = (query.uv as string) || 'all'

      const filters = prepareFilters(
        selectedFileFormats,
        selectedRenderers,
        selectedPolyFilter,
        selectedHairFilter,
        selectedRiggingFilter,
        selectedTexturesFilter,
        selectedUVFilter
      ).original

      const params: AxiosRequestConfig = {
        method: 'POST',
        url: 'models',
        data: {
          filters,
          page: 1,
          count: 48,
          query: route.query.q
        },
        headers: {
          ...app.$generateAuthHeader('models', 'POST'),
          'x-meshhouse-mature-content': !matureContent
        }
      }


      const data: WithPagination<ModelSimple[]> = (await app.$api(params)).data

      return {
        items: data.items,
        pagination: data.pagination,
        selectedFileFormats,
        selectedRenderers,
        selectedPolyFilter,
        selectedHairFilter,
        selectedRiggingFilter,
        selectedTexturesFilter,
        selectedUVFilter,
        matureContent: !matureContent ? 'true' : 'false'
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

  get availableFileFormats (): CheckboxMultiSelect[] {
    return FORMAT_FILTERS
  }

  get availableRenderers (): CheckboxMultiSelect[] {
    return RENDERER_FILTERS
  }

  get polygonsFilter (): CheckboxMultiSelect[] {
    return [
      {
        text: this.$t('filters.poly.any').toString(),
        value: 'all'
      },
      {
        text: this.$t('filters.poly.lowpoly').toString(),
        value: 'low-poly'
      },
      {
        text: this.$t('filters.poly.midpoly').toString(),
        value: 'mid-poly'
      },
      {
        text: this.$t('filters.poly.hipoly').toString(),
        value: 'hi-poly'
      }
    ]
  }

  get matureContentFilter (): CheckboxMultiSelect[] {
    return [
      {
        text: this.$t('filters.mature-content.true').toString(),
        value: true
      },
      {
        text: this.$t('filters.mature-content.false').toString(),
        value: false
      }
    ]
  }

  get hairFilter (): CheckboxMultiSelect[] {
    return [
      {
        text: this.$t('filters.hair.any').toString(),
        value: 'all'
      },
      {
        text: 'Standard',
        value: 'standard'
      },
      {
        text: 'Hairfarm',
        value: 'hairfarm'
      },
      {
        text: 'Ornatrix',
        value: 'ornatrix'
      },
      {
        text: 'XGen',
        value: 'xgen'
      },
      {
        text: 'Yeti',
        value: 'yeti'
      }
    ]
  }

  get riggingFilter (): CheckboxMultiSelect[] {
    return [
      {
        text: this.$t('filters.rigging.any').toString(),
        value: 'all'
      },
      {
        text: this.$t('filters.rigging.bones').toString(),
        value: 'bones'
      },
      {
        text: 'Autodesk CAT',
        value: 'autodesk_cat'
      }
    ]
  }

  get texturesFilter (): CheckboxMultiSelect[] {
    return [
      {
        text: this.$t('filters.textures.any').toString(),
        value: 'all'
      },
      {
        text: this.$t('filters.textures.procedural').toString(),
        value: 'procedural'
      },
      {
        text: 'PBR',
        value: 'pbr'
      },
      {
        text: 'NPR',
        value: 'npr'
      }
    ]
  }

  get texturesUVFilter (): CheckboxMultiSelect[] {
    return [
      {
        text: this.$t('filters.textures.any').toString(),
        value: 'all'
      },
      {
        text: this.$t('filters.textures.procedural').toString(),
        value: 'generated'
      },
      {
        text: 'Unwrap UVW',
        value: 'unwrap_uvw'
      },
      {
        text: 'UDIM',
        value: 'udim'
      },
      {
        text: 'UV-Tile',
        value: 'uvtile'
      }
    ]
  }

  get currentCategory (): ModelCatalogCurrentCategory {
    if (this.$route.query.tag !== undefined) {
      return {
        title_en: `Models with tag '${this.$route.query.tag}'`,
        title_ru: `Модели с тегом '${this.$route.query.tag}'`
      }
    }

    return this.$store.state.categories.find((item: Category) => item.slug === this.$route.params.category) ?? {
      title_en: 'All models',
      title_ru: 'Все модели'
    }
  }

  @Watch('$route.query')
  async handleSubmit (): Promise<void> {
    const prepared = prepareFilters(
      this.selectedFileFormats,
      this.selectedRenderers,
      this.selectedPolyFilter,
      this.selectedHairFilter,
      this.selectedRiggingFilter,
      this.selectedTexturesFilter,
      this.selectedUVFilter
    )
    const filters = prepared.original

    try {
      this.loading = true

      const params: AxiosRequestConfig = {
        method: 'POST',
        url: 'models',
        data: {
          filters,
          page: this.pagination.current_page,
          count: 48,
          query: this.$route.query.q
        },
        headers: {
          ...this.$generateAuthHeader('models', 'POST'),
          'x-meshhouse-mature-content': this.matureContent
        }
      }


      const data: WithPagination<ModelSimple[]> = (await this.$api(params)).data

      const querystring = qs.stringify({
        page: this.pagination.current_page > 1 ? this.pagination.current_page : undefined,
        ...prepared.simplified,
        mature: this.matureContent === 'false' ? false : undefined,
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
