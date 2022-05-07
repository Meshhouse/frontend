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

<i18n>
{
  "en": {
    "meta": {
      "api-docs": {
        "title": "API documentation"
      }
    }
  },
  "ru": {
    "meta": {
      "api-docs": {
        "title": "Документация API"
      }
    }
  }
}
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import '@stoplight/elements/styles.min.css'

@Component<APIDocs>({
  head () {
    return {
      title: this.$t('meta.api-docs.title').toString(),
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
