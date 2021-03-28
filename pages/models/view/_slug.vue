<template>
  <div>
    <model-slider :model="model" />
    <header class="grid-container grid-container--model-header">
      <h1 class="display-text display-text--h3">
        <span>{{ model[`title_${$i18n.locale}`] }}</span>
      </h1>
      <div class="button-group">
        <dropdown-button
          prepend-icon="share-alt"
          :width="300"
        >
          {{ $t('pages.model-single.buttons.share') }}
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
          :width="300"
        >
          {{ $t('pages.model-single.buttons.model') }}
          <template slot="content">
            <p class="dropdown__header">
              {{ $t('pages.model-single.buttons.textures_title') }}
            </p>
            <a
              class="dropdown__item"
              :href="model.textures_link"
              :disabled="model.textures_link === null || model.textures_link === ''"
            >
              {{ $t('pages.model-single.buttons.textures') }}
            </a>
            <p class="dropdown__header">
              {{ $t('pages.model-single.buttons.model_title') }}
            </p>
            <a
              v-for="(link, idx) in model.model_links"
              :key="`model-${idx}`"
              class="dropdown__item"
              :href="link.url"
            >
              {{ getDccName(link.program) }} {{ link.program_version }} - {{ getRendererName(link.renderer) }} {{ link.renderer_version }}
            </a>
          </template>
        </dropdown-button>
        <a
          class="button button--primary"
          :href="`meshhouse://install/meshhouse/MSH-${model.id}`"
        >
          {{ $t('pages.model-single.buttons.install') }}
        </a>
        <dropdown-button
          prepend-icon="donate"
          :width="300"
        >
          {{ $t('pages.model-single.buttons.donate') }}
          <template slot="content">
            <a href="https://commerce.coinbase.com/checkout/99ac55b7-2eb1-445a-90af-90359332b7ad" class="dropdown__item">
              {{ $t('pages.model-single.buttons.donate_content.coinbase') }}
            </a>
          </template>
        </dropdown-button>
      </div>
    </header>
    <main class="grid-container grid-container--model-description">
      <div class="description">
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
        <div v-if="model[`description_${$i18n.locale}`] !== ''">
          <h4 class="display-text display-text--h4">
            <span>
              {{ $t('pages.model-single.information.description') }}
            </span>
          </h4>
          <div style="margin-bottom: 1rem;" v-html="model[`description_${$i18n.locale}`]" />
        </div>
        <div v-if="model.tags.length > 0">
          <h4 class="display-text display-text--h4">
            <span>
              {{ $t('pages.model-single.information.tags') }}
            </span>
          </h4>
          <div class="tag-group">
            <vue-tag
              v-for="(tag, idx) in model.tags"
              :key="`tag-${idx}`"
              :tag="tag"
            />
          </div>
        </div>
      </div>
      <aside>
        <div class="table-container" style="margin-top: 1rem;">
          <table class="table table--large">
            <tbody>
              <tr>
                <th>{{ $t('pages.model-single.information.id') }}</th>
                <td>MSH-{{ model.id }}</td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.date') }}</th>
                <td>{{ format(new Date(model.created_at), 'dd.MM.yyyy') }}</td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.polys') }}</th>
                <td>{{ model.model_information.polygons }}</td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.verts') }}</th>
                <td>{{ model.model_information.vertices }}</td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.hair_system') }}</th>
                <td><font-awesome-icon :icon="model.model_information.hair_system ? 'check-circle' : 'times-circle'" /></td>
              </tr>
              <tr v-if="model.model_information.hair_system">
                <th>{{ $t('pages.model-single.hair_system_type') }}</th>
                <td>{{ model.model_information.hair_system_type }}</td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.blendshapes') }}</th>
                <td><font-awesome-icon :icon="model.model_information.blendshapes ? 'check-circle' : 'times-circle'" /></td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.rigging') }}</th>
                <td><font-awesome-icon :icon="model.model_information.rigged ? 'check-circle' : 'times-circle'" /></td>
              </tr>
              <tr v-if="model.model_information.rigged">
                <th>{{ $t('pages.model-single.rig_type') }}</th>
                <td>{{ model.model_information.rig_type }}</td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.textures_type') }}</th>
                <td>{{ model.model_information.textures_type }}</td>
              </tr>
              <tr>
                <th>{{ $t('pages.model-single.uv_maps') }}</th>
                <td><font-awesome-icon :icon="model.model_information.uv_maps ? 'check-circle' : 'times-circle'" /></td>
              </tr>
              <tr v-if="model.model_information.uv_maps">
                <th>{{ $t('pages.model-single.uv_maps_type') }}</th>
                <td>{{ model.model_information.uv_maps_type }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4
          v-if="model.related_models.length > 0"
          class="display-text display-text--h4"
          style="margin-top: 1rem"
        >
          <span>{{ $t('pages.model-single.information.related_items') }}</span>
        </h4>
        <model-card
          v-for="relatedModel in model.related_models"
          :key="relatedModel.id"
          class="model-card--related"
          :item="relatedModel"
          row
        />
      </aside>
    </main>
  </div>
</template>

<i18n>
{
  "en": {
    "pages": {
      "model-single": {
        "information": {
          "title": "Model information",
          "id": "Product id",
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
        "date": "Upload date:",
        "polys": "Polys:",
        "verts": "Verts:",
        "hair_system": "Hair system",
        "hair_system_type": "Hair plugin",
        "blendshapes": "Morpher / blendshapes:",
        "rigging": "Skeleton rigged",
        "rig_type": "Rig type",
        "textures_type": "Textures type",
        "uv_maps": "Unwrapped",
        "uv_maps_type": "Unwrap type",
        "textures": {
          "included": "Included",
          "procedural": "Procedural"
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
          "id": "Артикул модели",
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
        "date": "Дата загрузки:",
        "polys": "Полигонов:",
        "verts": "Вершин:",
        "hair_system": "Система волос",
        "hair_system_type": "Плагин для волос",
        "blendshapes": "Морфер / блендшейпы:",
        "rigging": "Привязка к скелету",
        "rig_type": "Система скелета",
        "textures_type": "Тип текстур",
        "uv_maps": "Развертка",
        "uv_maps_type": "Тип развертки",
        "textures": {
          "included": "Присутствуют",
          "procedural": "Процедурные"
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
import DropdownButton from '@/components/Button/DropdownButton.vue'
import ModelCard from '@/components/ModelCard/ModelCard.vue'
import VueTag from '@/components/Tag/Tag.vue'
import ModelSlider from '@/components/ModelSlider/ModelSlider.vue'
import VueAlert from '@/components/Alert/Alert.vue'
import type { StrapiModel } from '@/types'
import { format } from 'date-fns'
import { getDccName, getRendererName, getStringedArray } from '@/functions/helpers'

@Component<ModelSinglePage>({
  components: {
    DropdownButton,
    LazyHydrate,
    ModelCard,
    ModelSlider,
    VueAlert,
    VueTag
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
    preview: null,
    available_formats: []
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

  get embedLink (): string {
    const base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://meshhouse.art'
    return `${base}/embed/card/${this.model.slug}`
  }

  get embedCode (): string {
    return `<iframe src="${this.embedLink}" name="meshhouse-embed" height="360px" width="100%" sandbox="allow-popups allow-scripts" loading="lazy" style="border: none;"></iframe>`
  }

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }
}
</script>
