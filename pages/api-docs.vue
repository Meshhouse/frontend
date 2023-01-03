<template>
  <div class="api-docs">
    <client-only>
      <elements-api
        apidescriptionurl="/docs/MeshHouse-API-V1.yaml"
        hidetryit="true"
        router="hash"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import '@stoplight/elements/styles.min.css'

@Component<APIDocs>({
  head () {
    return {
      title: 'API',
      script: [
        {
          src: 'https://unpkg.com/@stoplight/elements/web-components.min.js'
        }
      ]
    }
  }
})

export default class APIDocs extends Vue {
}
</script>
