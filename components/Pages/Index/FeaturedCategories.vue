<template>
  <div class="grid-container">
    <h2 class="display-text display-text--h2">
      <span>
        {{ $t('pages.index.thematicBlock.title') }}
      </span>
    </h2>
    <div v-if="categories.length === 4" class="featured-categories">
      <nuxt-link class="featured-category" :to="localePath(getUrl(categories[0]))">
        <img
          class="featured-category__background"
          :src="getImageUrl(categories[0].thumbnail)"
          alt=""
        >
        <div class="featured-category__content">
          <h4 class="title">
            <span>{{ categories[0][`title_${$i18n.locale}`] }}</span>
          </h4>
        </div>
      </nuxt-link>
      <div class="featured-categories--aside">
        <nuxt-link class="featured-category" :to="localePath(getUrl(categories[1]))">
          <img
            class="featured-category__background"
            :src="getImageUrl(categories[1].thumbnail)"
            alt=""
          >
          <div class="featured-category__content">
            <h4 class="title">
              <span>{{ categories[1][`title_${$i18n.locale}`] }}</span>
            </h4>
          </div>
        </nuxt-link>
        <div class="featured-categories--sub">
          <nuxt-link class="featured-category" :to="localePath(getUrl(categories[2]))">
            <img
              class="featured-category__background"
              :src="getImageUrl(categories[2].thumbnail)"
              alt=""
            >
            <div class="featured-category__content">
              <h4 class="title">
                <span>{{ categories[2][`title_${$i18n.locale}`] }}</span>
              </h4>
            </div>
          </nuxt-link>
          <nuxt-link class="featured-category" :to="localePath(getUrl(categories[3]))">
            <img
              class="featured-category__background"
              :src="getImageUrl(categories[3].thumbnail)"
              alt=""
            >
            <div class="featured-category__content">
              <h4 class="title">
                <span>{{ categories[3][`title_${$i18n.locale}`] }}</span>
              </h4>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./FeaturedCategories.ts" />

<style lang="sass">
@import 'FeaturedCategories'
</style>
