<template>
  <div class="license">
    <header class="license__header">
      <b class="title">{{ license[`title_${$i18n.locale}`] }}</b>
      <div class="icons">
        <font-awesome-icon
          v-if="license.copyright_content"
          icon="copyright"
          class="icon-copyright"
          :title="$t('license-badges.copyright')"
        />
        <font-awesome-icon
          v-if="license.access !== 'free'"
          icon="donate"
          class="icon-donate"
          :title="$t('license-badges.donate')"
        />
        <font-awesome-icon
          v-if="license.mature_content"
          icon="venus"
          class="icon-onlyfans"
          :title="$t('license-badges.mature-content')"
        />
      </div>
    </header>
    <p class="license__description">
      {{ license[`description_${$i18n.locale}`] }}
    </p>
  </div>
</template>

<i18n>
{
  "en": {
    "license-badges": {
      "copyright": "Need permission from the copyright holders",
      "donate": "Avaliable only for subscribers",
      "mature-content": "Mature content"
    }
  },
  "ru": {
    "license-badges": {
      "copyright": "Необходимо разрешение от правообладателей",
      "donate": "Доступно только подписчикам",
      "mature-content": "Контент для взрослых"
    }
  }
}
</i18n>

<script lang="ts" src="./License.ts" />

<style lang="sass">
@import 'License'
</style>
