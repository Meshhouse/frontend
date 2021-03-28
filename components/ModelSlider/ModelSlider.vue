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
          @click="openLightboxOnSlide(idx + 1)"
        >
          <img
            class="swiper-lazy slide__background"
            :data-src="getImageUrl(slide)"
          >
          <img
            class="swiper-lazy slide__image"
            :data-src="getImageUrl(slide)"
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
            :model="getImageUrl(model.preview)"
            :title="model[`title_${$i18n.locale}`]"
            :thumbnail="getImageUrl(model.thumbnail)"
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
              class="slide__image"
              :src="getImageUrl(slide)"
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
              v-for="(slide, idx) in model.thumbnail_images"
              :key="`slide-${idx}`"
              class="swiper-slide swiper-slide--model-thumbnail"
            >
              <div class="slide__outer">
                <img
                  class="slide__image"
                  :src="getImageUrl(slide)"
                  loading="lazy"
                >
              </div>
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
    <client-only>
      <FsLightbox
        type="image"
        :toggler="toggleLightBox"
        :slide="lightboxSlide"
        :sources="lightboxSources"
        :disable-local-storage="true"
        :show-thumbs-on-mount="true"
      />
    </client-only>
  </div>
</template>

<script lang="ts" src="./ModelSlider.ts" />

<style lang="sass">
@import 'ModelSlider'
</style>
