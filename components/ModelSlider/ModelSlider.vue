<template>
  <div class="grid-container grid-container--slider-full-width">
    <client-only>
      <swiper
        ref="swiperTop"
        :options="swiperOption"
        class="swiper-container--top"
      >
        <a
          v-for="(slide, idx) in model.images"
          :key="`slide-${idx}`"
          class="swiper-slide swiper-slide--model-slide"
          @click="openLightboxOnSlide(idx)"
        >
          <img
            class="swiper-lazy slide__background"
            :data-src="slide.thumbnail"
          >
          <img
            class="swiper-lazy slide__image"
            :data-src="slide.slide"
          >
          <loader-slider />
        </a>
        <div
          v-if="model.preview !== null"
          class="swiper-slide swiper-slide--model-slide swiper-no-swiping"
        >
          <vue-model-viewer
            v-if="viewerVisible"
            class="swiper-lazy model-viewer"
            :model="model.preview"
            :title="model[`title_${$i18n.locale}`]"
            :thumbnail="model.thumbnail"
          />
          <loader-slider />
        </div>
        <div slot="button-prev" class="swiper-button-prev">
          <font-awesome-icon icon="angle-left" size="2x" />
        </div>
        <div slot="button-next" class="swiper-button-next">
          <font-awesome-icon icon="angle-right" size="2x" />
        </div>
        <div slot="pagination" class="swiper-pagination" />
      </swiper>
      <template slot="placeholder">
        <div class="swiper-container--top">
          <div
            v-for="(slide, idx) in model.images"
            :key="`slide-${idx}`"
            class="swiper-slide swiper-slide--model-slide"
          >
            <img
              class="slide__background"
              :src="slide.thumbnail"
              loading="lazy"
            >
            <img
              class="slide__image"
              :src="slide.original"
              loading="lazy"
            >
          </div>
        </div>
      </template>
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
          <template slot="placeholder">
            <div class="swiper-container--thumbnails-placeholder">
              <div
                v-for="(slide, idx) in model.images"
                :key="`slide-${idx}`"
                class="swiper-slide swiper-slide--model-thumbnail swiper-slide-active"
              >
                <img
                  class="slide__image"
                  :src="slide.original"
                  loading="lazy"
                >
              </div>
            </div>
          </template>
        </client-only>
      </div>
    </div>
    <overlay
      :visible="overlayVisible"
      @close="overlayVisible = false"
    >
      <model-slider-overlay
        :model="model"
        :default-slide="lightboxSlide"
        @close="overlayVisible = false"
      />
    </overlay>
  </div>
</template>

<script lang="ts" src="./ModelSlider.ts" />

<style lang="sass">
@import 'ModelSlider'
</style>
