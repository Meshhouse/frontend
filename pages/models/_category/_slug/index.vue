<template>
  <div>
    <breadcrumbs :elements="breadcrumbsElements" />
    <model-slider :model="model" />
    <header class="grid-container grid-container--model-header">
      <h1 class="display-text display-text--h3">
        <span>{{ model[`title_${$i18n.locale}`] }}</span>
      </h1>
      <div class="button-group">
        <v-button
          :class="{ 'button--favorite-active': isInFavorite }"
          color="primary"
          icon
          size="lg"
          @click="$store.commit('changeFavorite', model.id)"
        >
          <font-awesome-icon icon="heart" />
        </v-button>
        <dropdown-button
          prepend-icon="share-alt"
          :title="$t('pages.model-single.buttons.share')"
          :width="300"
          icon-only
          no-caret
        >
          <template slot="content">
            <p class="dropdown__header">
              {{ $t('pages.model-single.buttons.share_content.link') }}
            </p>
            <p class="dropdown__item">
              <input class="input" type="text" :value="embedLink" readonly>
            </p>
            <p class="dropdown__header">
              {{ $t('pages.model-single.buttons.share_content.iframe') }}
            </p>
            <p class="dropdown__item">
              <textarea class="input" type="text" :value="embedCode" readonly />
            </p>
          </template>
        </dropdown-button>
        <dropdown-button
          prepend-icon="cloud-download-alt"
          :title="$t('pages.model-single.buttons.model')"
          :width="300"
          :disabled="model.files.length === 0"
          icon-only
          no-caret
        >
          <template slot="content">
            <p class="dropdown__header">
              {{ $t('pages.model-single.buttons.textures_title') }}
            </p>
            <a
              class="dropdown__item"
              :href="model.textures_link"
              :disabled="model.textures_link === ''"
            >
              {{ $t('pages.model-single.buttons.textures') }}
            </a>
            <p class="dropdown__header">
              {{ $t('pages.model-single.buttons.model_title') }}
            </p>
            <a
              v-for="(file, idx) in model.files"
              :key="`model-${idx}`"
              class="dropdown__item"
              :href="file.url"
            >
              {{ getDccName(file.program) }} {{ file.program_version }} - {{ getRendererName(file.renderer) }} {{ file.renderer_version }}
            </a>
          </template>
        </dropdown-button>
        <a
          v-if="model.files.length > 0"
          class="button button--primary"
          :href="`meshhouse://install/meshhouse/MSH-${model.id}`"
        >
          {{ $t('pages.model-single.buttons.install') }}
        </a>

        <!--<dropdown-button
          prepend-icon="donate"
          :width="300"
        >
          {{ $t('pages.model-single.buttons.donate') }}
          <template slot="content">
            <a href="https://commerce.coinbase.com/checkout/99ac55b7-2eb1-445a-90af-90359332b7ad" class="dropdown__item">
              {{ $t('pages.model-single.buttons.donate_content.coinbase') }}
            </a>
          </template>
        </dropdown-button>-->
      </div>
    </header>
    <main class="grid-container grid-container--model-description">
      <div class="model__description">
        <vue-alert
          v-if="model.brands.length > 0"
          type="warning"
          :title="$t('pages.model-single.alerts.legal_notice.title')"
        >
          {{ $t('pages.model-single.alerts.legal_notice.text', { brand: getStringedArray(model.brands) }) }}
        </vue-alert>
        <vue-alert
          v-if="model.is_mature_content"
          type="onlyfans"
          :title="$t('pages.model-single.alerts.mature_content.title')"
        >
          {{ $t('pages.model-single.alerts.mature_content.text') }}
        </vue-alert>
        <div
          v-if="model[`description_${$i18n.locale}`] !== ''"
          class="description"
          v-html="model[`description_${$i18n.locale}`]"
        />
      </div>
      <aside>
        <div class="licenses">
          <license-block
            v-for="license in currentLicenses"
            :key="license.id"
            :license="license"
          />
        </div>
        <model-specifications :model="model" />
      </aside>
    </main>
    <div class="grid-container">
      <div v-if="model[`tags_${$i18n.locale}`].length > 0">
        <h3 class="display-text display-text--h3">
          <span>
            {{ $t('pages.model-single.information.tags') }}
          </span>
        </h3>
        <div class="tag-group">
          <vue-tag
            v-for="(tag, idx) in model[`tags_${$i18n.locale}`]"
            :key="`tag-${idx}`"
            :tag="tag"
          />
        </div>
      </div>
      <div
        v-for="collection in currentCollections"
        :key="collection.id"
      >
        <h3
          class="display-text display-text--h3"
          style="margin-top: 1rem"
        >
          <span>{{ collection[`title_${$i18n.locale}`] }}</span>
        </h3>
        <div class="grid-container grid-container--model-collection">
          <model-card
            v-for="item in collection.items"
            :key="item.id"
            :item="item"
            row
          />
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "pages": {
      "model-single": {
        "information": {
          "title": "Model information",
          "description": "Description",
          "tags": "Tags",
          "related_items": "Related models",
          "similar_items": "Similar models"
        },
        "buttons": {
          "install": "Install via Meshhouse",
          "share": "Share",
          "share_content": {
            "link": "Embed link",
            "iframe": "Embed card"
          },
          "donate": "Donate",
          "donate_content": {
            "coinbase": "Donate via Coinbase"
          },
          "textures": "Download textures",
          "textures_title": "Textures:",
          "model_title": "Models:",
          "model": "Download model"
        },
        "alerts": {
          "legal_notice": {
            "title": "Legal notice",
            "text": "The intellectual property depicted in this model, including the brand {brand}, is not affiliated with or endorsed by the original rights holders."
          },
          "mature_content": {
            "title": "Mature content",
            "text": "Images of the model, description, as well as the model itself may contain content that is not suitable for persons under the age of 18."
          }
        }
      }
    }
  },
  "ru": {
    "pages": {
      "model-single": {
        "information": {
          "title": "Информация о модели",
          "description": "Описание",
          "tags": "Теги",
          "related_items": "Связанные модели",
          "similar_items": "Похожие модели"
        },
        "buttons": {
          "install": "Установить через Meshhouse",
          "share": "Поделиться",
          "share_content": {
            "link": "Встроить ссылку",
            "iframe": "Встроить карточку"
          },
          "donate": "Пожертвовать",
          "donate_content": {
            "coinbase": "Пожертвовать через Coinbase"
          },
          "textures": "Скачать текстуры",
          "textures_title": "Текстуры:",
          "model_title": "Модели:",
          "model": "Скачать модель"
        },
        "alerts": {
          "legal_notice": {
            "title": "Информация о правообладателях",
            "text": "Интеллектуальная собственность, изображенная в этой модели, включая торговую марку {brand}, не связана с первоначальными правообладателями и не одобрена ими."
          },
          "mature_content": {
            "title": "Контент для взрослых",
            "text": "Изображения модели, описание, а также сама модель может содержать контент, не подходящий лицам, не достигшим 18 лет."
          }
        }
      }
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LazyHydrate from 'vue-lazy-hydration'
import DropdownButton from '@/components/DropdownButton/DropdownButton.vue'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import VueTag from '@/components/Tag/Tag.vue'
import ModelSlider from '@/components/ModelSlider/ModelSlider.vue'
import VueAlert from '@/components/Alert/Alert.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import LicenseBlock from '@/components/License/License.vue'
import ModelSpecifications from '@/components/ModelSpecifications/ModelSpecifications.vue'

import type {
  ModelFull
} from '@/types/api/models'

import type {
  License
} from '@/types/api/licenses'

import type {
  CollectionWithModels
} from '@/types/api/collections'

import type { NuxtApp } from '@nuxt/types/app'

import { format } from 'date-fns'
import { getDccName, getRendererName, getStringedArray } from '@/functions/helpers'

@Component<ModelSinglePage>({
  components: {
    Breadcrumbs,
    DropdownButton,
    LazyHydrate,
    ModelCard,
    ModelSlider,
    ModelSpecifications,
    VueAlert,
    VueTag,
    LicenseBlock
  },
  head () {
    return {
      title: this.model[`title_${this.$i18n.locale}`]
    }
  },
  methods: {
    format,
    getDccName,
    getRendererName,
    getStringedArray
  }
})

export default class ModelSinglePage extends Vue {
  overlayVisible = false
  selectedLicense = 'default'

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
    collections: []
  }

  currentLicenses: License[] = []

  currentCollections: CollectionWithModels[] = []

  async asyncData ({ app, route, store, error }: { app: NuxtApp, route: any, store: any, error: any }): Promise<any> {
    try {
      const data: ModelFull = (await app.$api({
        method: 'GET',
        url: `models/${route.params.slug}`,
        headers: app.$generateAuthHeader(`models/${route.params.slug}`, 'GET')
      })).data

      const currentLicenses: License[] = store.state.licenses.filter((license: License) => data.licenses.includes(license.id))

      const modelsCollections = (await app.$api({
        method: 'POST',
        url: 'models/collection',
        data: {
          ids: data.collections.map(collection => collection.id)
        },
        headers: app.$generateAuthHeader('models/collection', 'POST')
      })).data

      const currentCollections = data.collections.map((collection) => {
        return {
          ...collection,
          items: modelsCollections[collection.id]
        }
      })

      return {
        model: data,
        currentLicenses,
        currentCollections
      }
    } catch (err) {
      console.log(err)
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

  get breadcrumbsElements (): any[] {
    return [
      {
        title: this.$t('breadcrumbs.index').toString(),
        href: '/'
      },
      {
        title: this.$t('breadcrumbs.models').toString(),
        href: '/models'
      },
      {
        title: this.model.category.title_en,
        href: `/models/${this.model.category.slug}`
      },
      {
        title: this.model.title_en,
        href: `/models/category-1/${this.model.slug}`,
        active: true
      }
    ]
  }
}
</script>
