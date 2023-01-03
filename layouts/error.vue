<template>
  <div class="error-wrapper grid-container">
    <div class="error-info">
      <h1 class="display-text display-text--h1 status-code">
        <span>
          {{ error.statusCode }}
        </span>
      </h1>
      <h2 class="status-message">
        {{ error.statusCode === 404 ? 'Page not found' : 'An error occurred' }}
      </h2>
      <v-button
        color="primary"
        :href="localePath('/')"
      >
        Go back
        <font-awesome-icon icon="angle-left" />
      </v-button>
    </div>
    <div class="error-image">
      <img src="/images/index/auth-img.webp">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type { NuxtError } from '@nuxt/types'

@Component<ErrorLayout>({
  layout: 'error-page'
})
export default class ErrorLayout extends Vue {
  @Prop() readonly error!: NuxtError
}
</script>
