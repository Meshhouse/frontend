<template>
  <div>
    <header class="application__jumbotron">
      <div class="grid-container grid-container--application-header">
        <div class="column">
          <h1 class="display-text display-text--h1 jumbotron__header">
            <span>
              {{ $t('application.jumbotron.title') }}
            </span>
          </h1>
          <p class="application__description">
            {{ $t('application.jumbotron.text') }}
          </p>
          <div class="application__jumbotron-links">
            <a
              class="button button--primary"
              :href="data.release.assets.windows"
              target="_blank"
              rel="noreferrer"
            >
              <font-awesome-icon :icon="['fab', 'windows']" />
              {{ $t('application.download.windows', { version: data.release.version }) }}
            </a>
            <a
              class="button button--primary"
              :href="data.release.assets.mac"
              target="_blank"
              rel="noreferrer"
            >
              <font-awesome-icon :icon="['fab', 'apple']" />
              {{ $t('application.download.mac', { version: data.release.version }) }}
            </a>
            <a
              class="button button--primary"
              :href="data.release.assets.linux"
              target="_blank"
              rel="noreferrer"
            >
              <font-awesome-icon :icon="['fab', 'linux']" />
              {{ $t('application.download.linux', { version: data.release.version }) }}
            </a>
          </div>
        </div>
        <div class="column">
          <img
            class="application__jumbotron-image"
            src="/images/application/jumbotron.webp"
            alt="MeshHouse"
          >
        </div>
      </div>
    </header>
    <div class="grid-container">
      <h2 class="display-text display-text--h2">
        <span>
          {{ $t('application.integrations') }}
        </span>
      </h2>
      <div class="integrations__container">
        <div
          v-for="integration in data.integrations"
          :key="`integration-${integration.title}`"
          class="integration"
        >
          <img
            class="integration__logo"
            :src="getImageUrl(integration.logo)"
            :alt="integration.title"
          >
        </div>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 200px" />
              <th>{{ $t('application.integrations__table.auth') }}</th>
              <th>{{ $t('application.integrations__table.filters') }}</th>
              <th>{{ $t('application.integrations__table.download') }}</th>
              <th>{{ $t('application.integrations__table.install') }}</th>
              <th>{{ $t('application.integrations__table.purchase') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="integration in data.integrations"
              :key="`integration-tr-${integration.title}`"
            >
              <td>
                <img
                  class="table__image"
                  :src="getImageUrl(integration.logo)"
                  :alt="integration.title"
                >
              </td>
              <td>
                <font-awesome-icon :icon="integration.authentication ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.custom_filters ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.download_models ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.custom_installation ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.purchase_models ? 'check-circle' : 'times-circle'" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "application": {
      "title": "Meshhouse application",
      "jumbotron": {
        "title": "Handle your model library with ease",
        "text": "with our cross-platform open-sourced application."
      },
      "lead": "Meshhouse - open-source 3D catalogizer program, built with Electron. <b>100% optional</b>",
      "featureTitle": "Features:",
      "featureList": "<li><p class='mb-0'>Meshhouse integration*</p></li><li><p class='mb-0'>Adding custom catalogs (grid and table view)</p></li><li><p class='mb-0'>Filter through your models collection</p></li><li><p class='mb-0'>Localization support</p></li>",
      "note": "* - currently not implemented.",
      "platforms": "Supported platforms:",
      "platformWin": "Windows 7-10 (x64 only)",
      "platformMac": "MacOS 10.10 Yosemite and newer",
      "platformLinux": "Ubuntu 12.04, Fedora 21, Debian 8 and newer",
      "localize": "Localizations:",
      "status": "Currently in development, but you can build application by own:",
      "link": "Github repo",
      "download": {
        "windows": "Download for Windows 7-10 x64 ({version})",
        "mac": "Download for MacOS 10.10 - 10.15 ({version})",
        "linux": "Download for Linux AppImage ({version})"
      },
      "integrations": "Available integrations",
      "integrations__table": {
        "auth": "Authentication",
        "filters": "Custom filters",
        "download": "Download models",
        "install": "Custom installation",
        "purchase": "Purchase models"
      }
    }
  },
  "ru": {
    "application": {
      "title": "Приложение Meshhouse",
      "jumbotron": {
        "title": "Управляйте вашей библитекой моделей с легкостью",
        "text": "с нашей программой с открытым исходным кодом."
      },
      "lead": "Meshhouse - галерея 3D моделей с открытым исходным кодом, сделанный на Electron. <b>100% опционально</b>",
      "featureTitle": "Возможности:",
      "featureList": "<li><p class='mb-0'>Интеграция с сервисом Meshhouse*</p></li><li><p class='mb-0'>Добавление своих каталогов моделей (вид сеткой и таблицей)</p></li><li><p class='mb-0'>Сортируйте модели в вашей коллекции</p></li><li><p class='mb-0'>Поддержка локализации</p></li>",
      "note": "* - пока не реализовано.",
      "platforms": "Поддерживаемые платформы:",
      "platformWin": "Windows 7-10 (только x64)",
      "platformMac": "MacOS 10.10 Yosemite и новее",
      "platformLinux": "Ubuntu 12.04, Fedora 21, Debian 8 и новее",
      "localize": "Локализации:",
      "status": "На данный момент программа в разработке, но вы можете собрать приложение самому:",
      "link": "Репозиторий Github",
      "download": {
        "windows": "Скачать для Windows 7-10 x64 ({version})",
        "mac": "Скачать для MacOS 10.10 - 10.15 ({version})",
        "linux": "Скачать для Linux AppImage ({version})"
      },
      "integrations": "Доступные интеграции",
      "integrations__table": {
        "auth": "Аутентификация",
        "filters": "Расширенные фильтры",
        "download": "Скачивание моделей",
        "install": "Расширенная установка моделей",
        "purchase": "Покупка моделей"
      }
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LazyHydrate from 'vue-lazy-hydration'

@Component({
  components: {
    LazyHydrate
  },
  head () {
    return {
      title: this.$i18n.t('application.title').toString()
    }
  }
})

export default class IndexPage extends Vue {
  async asyncData ({ app }: { app: any }): Promise<any> {
    try {
      const data = (await app.$strapi({
        method: 'GET',
        url: '/application-pc'
      })).data

      return {
        data
      }
    } catch (err) {
      console.log(err)
      return {
        data: {
          integrations: [],
          release: {
            version: 'N/A',
            assets: {
              windows: '',
              mac: '',
              linux: ''
            }
          }
        }
      }
    }
  }

  getImageUrl (thumbnail: string | null): string {
    const imageBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.meshhouse.art'
    return thumbnail !== null ? `${imageBaseUrl}${thumbnail}` : ''
  }
}
</script>

<style lang="sass">
.integrations
  &__container
    display: grid
    grid-template-columns: repeat(5, 1fr)
    grid-auto-rows: 1fr
    grid-gap: 1rem
    margin: 2rem auto

.integration
  display: flex
  align-items: center
  padding: 1rem
  background-color: var(--block-color)
  border-radius: $border-radius-large
  &__logo
    display: block
    width: 100%
    height: 80px
    object-fit: contain
</style>
