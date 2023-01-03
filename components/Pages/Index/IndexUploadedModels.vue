<template>
  <div class="uploaded-models">
    <div class="grid-container">
      <h2 class="display-text display-text--h2">
        <span>
          {{ $t('blocks.lastUploadedModels.title') }}
        </span>
      </h2>
    </div>
    <div class="grid-container grid-container--model-collection">
      <model-card
        v-for="model in models"
        :key="model.id"
        :item="model"
        row
      />
    </div>
  </div>
</template>

<script lang="ts" src="./IndexUploadedModels.ts" />

<style lang="sass">
@import 'IndexUploadedModels'
</style>
