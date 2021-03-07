<template>
  <div class="grid-container grid-container--slider-full-width">
    <client-only>
      <swiper
        ref="swiperTop"
        :options="swiperOption"
        class="swiper-container--top"
      >
        <div
          v-for="(slide, idx) in model.images"
          :key="`slide-${idx}`"
          class="swiper-slide swiper-slide--model-slide"
        >
          <img
            class="slide__background"
            :src="getImageUrl(slide)"
          >
          <img
            class="slide__image"
            :src="getImageUrl(slide)"
          >
        </div>
        <div
          v-if="model.preview !== null"
          class="swiper-slide swiper-slide--model-slide swiper-no-swiping"
        >
          <model-viewer
            class="model-viewer"
            :model="getImageUrl(model.preview)"
            hdri="/images/hdri/colorful_studio_1k.hdr"
            :modeltitle="model[`title_${$i18n.locale}`]"
            author="MeshHouse Team"
            authorlink="https://longsightedfilms.com"
            :autohide="true"
            :thumbnail="getImageUrl(model.thumbnail)"
          >
            <span slot="loader">
              <img src="/icons/logo-icon.svg" alt="Meshhouse">
            </span>
            <span slot="logo">
              <img src="/icons/logo-full.svg" alt="Meshhouse" style="width: 300px">
            </span>
          </model-viewer>
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
</template>

<script lang="ts" src="./ModelSlider.ts" />

<style lang="sass">
@import 'ModelSlider'
</style>
