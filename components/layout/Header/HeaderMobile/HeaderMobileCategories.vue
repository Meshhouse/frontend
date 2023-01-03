<template>
  <modal-basic
    class="mobile-categories"
    size="full-page"
    :title="activeCategory ? activeCategoryObject.title : $t('navigation.modelsCatalog')"
    contentless
    show-back-button
    @back="onReturnBack"
    @close="$emit('close')"
  >
    <div
      v-if="!activeCategory"
      class="mobile-categories__list"
    >
      <a
        class="mobile-categories__category"
        :href="localePath('/models/')"
        @click.prevent="navigate('/models/')"
      >
        {{ $t('navigation.modelsAll') }}
      </a>
      <a
        v-for="item in rootCategories"
        :key="item.id"
        class="mobile-categories__category"
        :href="localePath(`/models/${item.slug}`)"
        @click.prevent="activeCategory = item.slug"
      >
        {{ item.title }}
      </a>
    </div>
    <div
      v-if="activeCategory && activeCategoryObject !== undefined"
      class="mobile-categories__list"
    >
      <a
        class="mobile-categories__category"
        :href="localePath(`/models/${activeCategoryObject.slug}`)"
        @click.prevent="navigate(`/models/${activeCategoryObject.slug}`)"
      >
        {{ $t('navigation.modelsAll') }}
      </a>
      <a
        v-for="children in activeCategoryObject.childrens"
        :key="children.id"
        class="mobile-categories__category"
        :href="localePath(`/models/${children.slug}`)"
        @click.prevent="navigate(`/models/${children.slug}`)"
      >
        <img
          class="category__icon"
          :src="`/icons/${children.icon}.png`"
          loading="lazy"
        >
        {{ children.title }}
      </a>
    </div>
  </modal-basic>
</template>

<script lang="ts" src="./HeaderMobileCategories.ts" />

<style lang="sass">
@import './HeaderMobileCategories'
</style>
