<template>
  <footer class="top-supporters">
    <div class="top-supporters__container">
      <h3 class="display-text display-text--h3">
        <span>{{ $t('top-supporters.title') }}</span>
      </h3>
      <div class="top-supporters__wrapper">
        <a
          v-for="supporter in supporters"
          :key="supporter.title"
          class="top-supporter"
          :href="supporter.url"
          rel="nofollow"
          :title="supporter.title"
        >
          <img
            class="top-supporter__image"
            :src="supporter.logo"
            :alt="supporter.title"
            :title="supporter.title"
          >
        </a>
      </div>
    </div>
  </footer>
</template>

<i18n>
{
  "en": {
    "top-supporters": {
      "title": "Also supported by:"
    }
  },
  "ru": {
    "top-supporters": {
      "title": "Также спонсируется:"
    }
  }
}
</i18n>

<script lang="ts" src="./FooterTopSupporters.ts" />

<style lang="sass">
@import 'FooterTopSupporters'
</style>
