<template>
  <div
    class="model-card-preview"
    :style="previewStyles"
  >
    <div class="model-card-preview__wrapper">
      <loader-slider v-if="loading" />
      <template v-else>
        <div class="model-card-preview__tags">
          <div
            v-if="item.mature_content"
            class="model-tag model-tag--mature-content"
            :title="$t('license.matureContent')"
          >
            <font-awesome-icon icon="1" />
            <font-awesome-icon icon="8" />
            <font-awesome-icon icon="plus" />
          </div>
          <div
            v-if="item.copyrighted_content"
            class="model-tag model-tag--copyright"
            :title="$t('license.copyright')"
          >
            <font-awesome-icon :icon="['regular', 'copyright']" />
          </div>
        </div>
        <div class="model-card-preview__formats">
          <div
            v-for="file in getAvailableFileBlocks"
            :key="`${file.program}-${file.version}`"
            class="format"
          >
            <img
              class="icon"
              :src="`/icons/programs/${file.program}.svg`"
              :title="`${file.title} - ${file.renderers}`"
            >
            <div class="badge">{{ file.version }}</div>
          </div>
        </div>
        <div class="grid-container grid-container--slider-full-width">
          <swiper
            ref="swiperTop"
            :options="swiperOption"
            class="swiper-container--top"
          >
            <div
              v-for="(slide, idx) in fullItem.images"
              :key="`slide-${idx}`"
              class="swiper-slide swiper-slide--model-slide"
            >
              <img
                class="swiper-lazy slide__background"
                :data-src="slide.thumbnail"
                :alt="fullItem.title"
              >
              <img
                class="swiper-lazy slide__image"
                :data-src="slide.slide"
                :alt="fullItem.title"
              >
              <loader-slider />
            </div>
            <div slot="pagination" class="swiper-pagination" />
          </swiper>
        </div>
        <div class="model-card-preview__info">
          <breadcrumbs :elements="breadcrumbsElements" />
          <div class="model-card__statistics">
            <div class="statistic">
              <font-awesome-icon icon="thumbs-up" />
              {{ item.statistics.likes }}
            </div>
            <div class="statistic">
              <font-awesome-icon icon="chart-line" />
              {{ item.statistics.views }}
            </div>
            <div class="statistic">
              <font-awesome-icon icon="cloud-arrow-down" />
              {{ item.statistics.downloads }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./ModelCardPreview.ts" />

<style lang="sass">
@import 'ModelCardPreview'
</style>
