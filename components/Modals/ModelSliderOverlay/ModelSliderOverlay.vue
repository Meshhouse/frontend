<template>
  <main class="model-slider-overlay">
    <header class="model-slider-overlay__header">
      <h3 class="display-text display-text--h3">
        <span>{{ model.title }}</span>
      </h3>
      <div class="header-actions">
        <button
          class="overlay-close"
          @click="handleFullScreen"
        >
          <font-awesome-icon :icon="isInFullscreen ? 'compress' : 'expand'" />
        </button>
        <button
          class="overlay-close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </header>
    <div class="model-slider-overlay__wrapper">
      <client-only>
        <div class="model-slider-overlay__counter">
          {{ currentIndex + 1 }} / {{ totalSlides }}
        </div>
        <swiper
          ref="swiperTop"
          :options="swiperOption"
          class="swiper-container--top"
        >
          <a
            v-for="(slide, idx) in model.images"
            :key="`slide-${idx}`"
            class="swiper-slide swiper-slide--model-slide"
          >
            <div class="swiper-zoom-container">
              <img
                class="swiper-lazy slide__image"
                :data-src="slide.original"
                :alt="model.title"
              >
            </div>
            <loader-slider hide-background />
          </a>
          <div
            v-if="model.preview !== null"
            class="swiper-slide swiper-slide--model-slide swiper-no-swiping"
          >
            <vue-model-viewer
              v-if="viewerVisible"
              class="swiper-lazy model-viewer"
              :model="model.preview"
              :title="model.title"
              :thumbnail="model.thumbnail"
            />
            <loader-slider hide-background />
          </div>
          <div slot="button-prev" class="swiper-button-prev">
            <font-awesome-icon icon="angle-left" size="2x" />
          </div>
          <div slot="button-next" class="swiper-button-next">
            <font-awesome-icon icon="angle-right" size="2x" />
          </div>
          <div slot="pagination" class="swiper-pagination" />
        </swiper>
      </client-only>
      <div class="container-slider-thumbnails">
        <div class="grid-container">
          <client-only>
            <swiper
              ref="swiperThumbs"
              :options="swiperGallery"
              class="swiper-container--thumbnails"
            >
              <div
                v-for="(slide, idx) in model.images"
                :key="`slide-${idx}`"
                class="swiper-slide swiper-slide--model-thumbnail"
              >
                <img
                  class="slide__image"
                  :src="slide.thumbnail"
                  loading="lazy"
                >
              </div>
              <div
                v-if="model.preview !== null"
                class="swiper-slide swiper-slide--model-thumbnail"
              >
                <div class="slide__icon-container">
                  <font-awesome-icon icon="cube" />
                </div>
              </div>
            </swiper>
          </client-only>
        </div>
      </div>
    </div>
  </main>
</template>


<script lang="ts" src="./ModelSliderOverlay.ts" />

<style lang="sass">
@import "ModelSliderOverlay"
</style>
