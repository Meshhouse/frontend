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
            class="slide__background"
            :src="getImageUrl(slide)"
          >
          <img
            class="slide__image"
            :src="getImageUrl(slide)"
          >
        </a>
        <div
          v-if="model.preview !== null"
          class="swiper-slide swiper-slide--model-slide swiper-no-swiping"
        >
          <vue-model-viewer
            v-if="viewerVisible"
            class="model-viewer"
            :model="getImageUrl(model.preview)"
            :title="model[`title_${$i18n.locale}`]"
            :thumbnail="getImageUrl(model.thumbnail)"
          />
        </div>
        <div slot="button-prev" class="swiper-button-prev" />
        <div slot="button-next" class="swiper-button-next" />
        <div slot="pagination" class="swiper-pagination" />
      </swiper>
      <template slot="placeholder">
        <div
          v-for="(slide, idx) in model.images"
          :key="`slide-${idx}`"
          class="swiper-slide swiper-slide--model-slide"
        >
          <img
            class="slide__image"
            :src="getImageUrl(slide)"
          >
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
              <div class="slide__outer">
                <img
                  class="slide__image"
                  :src="getImageUrl(slide)"
                >
              </div>
            </div>
            <div
              v-if="model.preview !== null"
              class="swiper-slide swiper-slide--model-thumbnail"
            >
              <div class="slide__outer">
                <img
                  class="slide__image"
                  src="/icons/logo-icon.svg"
                >
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
