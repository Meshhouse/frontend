<template>
  <div class="grid-container grid-container--slider-full-width">
    <div
      v-swiper="swiperOption"
      class="swiper-container slider--jumbotron"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(slide, idx) in slides"
          :key="slide.id"
          class="swiper-slide swiper-slide--index-slider"
        >
          <picture class="slide__background">
            <img
              class="slide__background"
              :src="getImageUrl(slide.background)"
              alt=""
            >
          </picture>
          <div class="slide__container">
            <div
              class="slide__content"
              :class="idx % 2 !== 0 ? 'slide__content--right' : 'slide__content--left'"
            >
              <h1 class="display-text display-text--h1">
                <span>{{ slide[`title_${$i18n.locale}`] }}</span>
              </h1>
              <p class="description">
                {{ slide[`description_${$i18n.locale}`] }}
              </p>
              <p class="courtesy">
                {{ slide.courtesy }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IndexCarousel.ts" />

<style lang="sass">
@import 'IndexCarousel'
</style>
