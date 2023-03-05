<template>
  <div class="grid-container mt-4">
    <h3 class="display-text display-text--h3">
      <span>
        {{ title }}
      </span>
    </h3>
    <div
      v-swiper:swiperCategory="swiperCategoriesOption"
      class="models-slider__categories"
    >
      <div class="swiper-wrapper">
        <v-button
          v-for="category in accessories.categories"
          :key="category.id"
          :color="currentCategory === category.id ? 'primary' : 'default'"
          size="sm"
          @click="currentCategory = category.id"
        >
          {{ category.title }}
        </v-button>
      </div>
    </div>
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

<script lang="ts" src="./ModelsSliderByCategory.ts" />

<style lang="sass">
@import 'ModelsSlider'
</style>
