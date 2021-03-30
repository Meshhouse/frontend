<template>
  <div>
    <div class="grid-container">
      <h2 class="display-text display-text--h2">
        <span>
          {{ $t('index-programs__title') }}
        </span>
      </h2>
    </div>
    <div class="grid-container grid-container--models">
      <model-card
        v-for="model in models"
        :key="model.id"
        :item="model"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./IndexUploadedModels.ts" />

<style lang="sass">
@import 'IndexUploadedModels'
</style>

<i18n>
{
  "en": {
    "index-programs__title": "Last uploaded models"
  },
  "ru": {
    "index-programs__title": "Последние загруженные модели"
  }
}
</i18n>
