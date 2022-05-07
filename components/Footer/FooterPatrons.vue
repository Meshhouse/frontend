<template>
  <footer class="patrons">
    <div class="patrons__container">
      <h3 class="display-text display-text--h3">
        <span>{{ $t('patrons.title') }}</span>
      </h3>
      <div class="patrons__wrapper">
        <span
          v-for="(patron, idx) in patrons"
          :key="`patron-${idx}`"
          class="patron"
          :class="`patron--${patron.level}`"
        >
          {{ patron.title }}
        </span>
      </div>
    </div>
  </footer>
</template>

<i18n>
{
  "en": {
    "patrons": {
      "title": "Thanks to our Patrons"
    }
  },
  "ru": {
    "patrons": {
      "title": "Спасибо нашим Патронам"
    }
  }
}
</i18n>

<script lang="ts" src="./FooterPatrons.ts" />

<style lang="sass">
@import 'FooterPatrons'
</style>
