<template>
  <div>
    <div class="grid-container">
      <header class="models-header">
        <h1 class="display-text display-text--h2">
          <span>
            {{ $t('form.apiKeys') }}
          </span>
        </h1>
        <v-button
          color="primary"
          size="lg"
          :title="$t('form.create')"
          icon
          @click="openCreate"
        >
          <font-awesome-icon icon="plus" />
        </v-button>
      </header>
      <APIKeyBlock
        v-for="keyBlock in apiKeys"
        :key="keyBlock.id"
        :block="keyBlock"
        @delete="deleteToken"
      />
    </div>
    <overlay
      :visible="overlayVisible"
      @close="overlayVisible = false"
    >
      <component
        :is="overlayComponent"
        :token="createdToken"
        @success="onCreateKey"
        @close="overlayVisible = false"
      />
    </overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Overlay from '@/components/Overlay/Overlay.vue'
import APIKeyCreate from '@/components/Modals/APIKeyCreate/APIKeyCreate.vue'
import APIKeySuccess from '@/components/Modals/APIKeySuccess/APIKeySuccess.vue'
import APIKeyBlock from '@/components/APIKeyBlock/APIKeyBlock.vue'

import type {
  APIToken
} from '@/types/api/users'

import type { NuxtApp } from '@nuxt/types/app'

@Component<UserAPIKeys>({
  middleware: 'auth',
  components: {
    APIKeyCreate,
    APIKeySuccess,
    APIKeyBlock,
    Overlay
  },
  head () {
    return {
      title: this.$t('form.apiKeys').toString()
    }
  }
})

export default class UserAPIKeys extends Vue {
  overlayVisible = false
  overlayComponent = 'APIKeyCreate'
  createdToken = ''

  apiKeys: APIToken[] = []

  async asyncData ({ app }: { app: NuxtApp }): Promise<any> {
    try {
      const response = await app.$api.request<APIToken[]>({
        method: 'POST',
        url: 'api-keys',
        headers: app.$generateAuthHeader('api-keys', 'POST')
      })

      return {
        apiKeys: response.data
      }
    } catch (err) {
      console.log(err)
    }
  }

  openCreate () {
    this.overlayVisible = true
    this.overlayComponent = 'APIKeyCreate'
  }

  onCreateKey (token: string) {
    this.overlayVisible = false
    this.createdToken = token
    this.fetchTokens().finally(() => {
      this.$nextTick(() => {
        this.overlayVisible = true
        this.overlayComponent = 'APIKeySuccess'
        this.fetchTokens()
      })
    })
  }

  async deleteToken (id: number) {
    try {
      await this.$api.request<APIToken[]>({
        method: 'DELETE',
        url: 'api-keys',
        data: {
          id
        },
        headers: this.$generateAuthHeader('api-keys', 'POST')
      })

      this.fetchTokens()
    } catch (err) {
      console.log(err)
    }
  }

  async fetchTokens () {
    try {
      const response = await this.$api.request<APIToken[]>({
        method: 'POST',
        url: 'api-keys',
        headers: this.$generateAuthHeader('api-keys', 'POST')
      })

      console.log(response.data)

      this.apiKeys = response.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
