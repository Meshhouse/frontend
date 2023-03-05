<template>
  <div class="grid-container mt-4">
    <h3 class="display-text display-text--h3">
      <span>
        {{ title }}
      </span>
    </h3>
    <div
      v-swiper="swiperOption"
      class="models-slider"
    >
      <div class="swiper-wrapper">
        <model-card
          v-for="model in models"
          :key="model.id"
          class="swiper-slide"
          :item="model"
          :blur-mature-content="blurMatureContent"
        />
      </div>
      <div class="swiper-button-prev">
        <font-awesome-icon icon="angle-left" size="2x" />
      </div>
      <div class="swiper-button-next">
        <font-awesome-icon icon="angle-right" size="2x" />
      </div>
      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<script lang="ts" src="./ModelsSlider.ts" />

<style lang="sass">
@import 'ModelsSlider'
</style>
