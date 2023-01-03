<template>
  <div>
    <header class="application__jumbotron">
      <div class="grid-container grid-container--application-header">
        <div class="column">
          <h1 class="display-text display-text--h2 jumbotron__header">
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
              :href="release.assets.windows"
              target="_blank"
              rel="noreferrer"
            >
              <font-awesome-icon :icon="['fab', 'windows']" />
              {{ $t('application.download.windows', { version: release.version }) }}
            </a>
            <a
              class="button button--primary"
              :href="release.assets.mac"
              target="_blank"
              rel="noreferrer"
            >
              <font-awesome-icon :icon="['fab', 'apple']" />
              {{ $t('application.download.mac', { version: release.version }) }}
            </a>
            <a
              class="button button--primary"
              :href="release.assets.linux"
              target="_blank"
              rel="noreferrer"
            >
              <font-awesome-icon :icon="['fab', 'linux']" />
              {{ $t('application.download.linux', { version: release.version }) }}
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
    <div class="grid-container grid-container--application">
      <div class="column column--application">
        <h2 class="display-text display-text--h2">
          <span>
            {{ $t('application.blocks.1.title') }}
          </span>
        </h2>
        <p>{{ $t('application.blocks.1.text') }}</p>
        <p class="note">
          {{ $t('application.blocks.1.note') }}
        </p>
      </div>
      <div class="column column--application">
        <img
          class="application__thumbnail"
          src="/images/application/catalog.webp"
        >
      </div>
      <div class="column column--application">
        <img
          class="application__thumbnail application__thumbnail--tall"
          src="/images/application/integrations.webp"
        >
      </div>
      <div class="column column--application">
        <h2 class="display-text display-text--h2">
          <span>
            {{ $t('application.blocks.2.title') }}
          </span>
        </h2>
        <p>
          {{ $t('application.blocks.2.text') }}
        </p>
        <p class="note">
          {{ $t('application.blocks.2.note') }}
        </p>
      </div>
      <div class="column column--application">
        <h2 class="display-text display-text--h2">
          <span>
            {{ $t('application.blocks.3.title') }}
          </span>
        </h2>
        <p>{{ $t('application.blocks.3.text') }}</p>
        <p class="note">
          {{ $t('application.blocks.3.note') }}
        </p>
      </div>
      <div class="column column--application">
        <img
          class="application__thumbnail"
          src="/images/application/model_info.webp"
        >
      </div>
    </div>
    <div class="grid-container">
      <h2 class="display-text display-text--h2">
        <span>
          {{ $t('application.integrations') }}
        </span>
      </h2>
      <div class="integrations__heading">
        <img
          class="integration__preview"
          src="/images/application/open3dlab.webp"
        >
        <img
          class="integration__preview"
          src="/images/application/sfmlab.webp"
        >
        <img
          class="integration__preview"
          src="/images/application/smutbase.webp"
        >
      </div>
      <div class="integrations__container">
        <div
          v-for="integration in integrations.content"
          :key="`integration-${integration.title}`"
        >
          <a
            class="integration"
            :href="integration.url"
            target="_blank"
          >
            <img
              class="integration__logo"
              :src="integration.logo"
              :alt="integration.title"
              :title="integration.title"
            >
          </a>
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
              v-for="integration in integrations.content"
              :key="`integration-tr-${integration.title}`"
            >
              <td>
                <img
                  class="table__image"
                  :src="integration.logo"
                  :alt="integration.title"
                >
              </td>
              <td>
                <font-awesome-icon :icon="integration.params.auth ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.params.filters ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.params.download ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.params.custom_install ? 'check-circle' : 'times-circle'" />
              </td>
              <td>
                <font-awesome-icon :icon="integration.params.purchase ? 'check-circle' : 'times-circle'" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LazyHydrate from 'vue-lazy-hydration'
import type {
  DynamicBlock,
  Integration
} from '@meshhouse/types'
import type { NuxtApp } from '@nuxt/types/app'
import type {
  ApplicationRelease
} from '@/types'

@Component({
  components: {
    LazyHydrate
  },
  head () {
    return {
      title: this.$i18n.t('navigation.application').toString()
    }
  }
})

export default class IndexPage extends Vue {
  draft: ApplicationRelease = {
    version: 'N/A',
    assets: {
      windows: '',
      mac: '',
      linux: ''
    }
  }

  release: ApplicationRelease = {
    version: 'N/A',
    assets: {
      windows: '',
      mac: '',
      linux: ''
    }
  }

  integrations: DynamicBlock<Integration> = {
    id: -1,
    type: 'integrations',
    content: [],
    created_at: '',
    updated_at: ''
  }

  async asyncData ({ app }: { app: NuxtApp }): Promise<any> {
    try {
      const responses = await Promise.all([
        app.$api.request({
          method: 'GET',
          url: 'pages/application',
          headers: app.$generateAuthHeader('pages/application', 'GET')
        }),
        app.$api.request<DynamicBlock<Integration>>({
          method: 'GET',
          url: 'blocks/integrations',
          headers: app.$generateAuthHeader('blocks/integrations', 'GET')
        })
      ])

      return {
        release: responses[0].data.release,
        draft: responses[0].data.draft,
        integrations: responses[1].data
      }
    } catch (err) {
      app.$sentry.captureException(err)
      console.error(err)
    }
  }
}
</script>
