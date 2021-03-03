<template>
  <div class="header__categories">
    <button
      class="button button--primary"
      @click="toggle"
    >
      {{ $t('navigation.modelsCatalog') }}
      <font-awesome-icon icon="bars" />
    </button>
    <div
      class="categories"
      :class="toggled ? 'categories--active' : ''"
    >
      <div class="categories__fade" />
      <div class="categories__container">
        <div class="column">
          <nuxt-link
            class="category category--root"
            :to="localePath('/models/all')"
          >
            {{ $t('navigation.modelsAll') }}
            <font-awesome-icon icon="angle-double-left" />
          </nuxt-link>
        </div>
        <div
          v-for="item in rootCategories"
          :key="item.id"
          class="column"
        >
          <nuxt-link
            class="category category--root"
            :to="localePath(`/models/${item.slug}`)"
          >
            <!--
            <img
              class="item__icon"
              :src="`/icons/${item.icon}.svg`"
            >-->
            {{ item[`title_${$i18n.locale}`] }}
            <font-awesome-icon icon="angle-double-left" />
          </nuxt-link>
          <div class="category__block">
            <nuxt-link
              v-for="nestedItem in getNestedCategories(item)"
              :key="nestedItem.id"
              class="category category--nested"
              :to="localePath(`/models/${nestedItem.slug}`)"
            >
              <img
                class="category__icon"
                :src="`/icons/${item.icon}.svg`"
              >
              {{ nestedItem[`title_${$i18n.locale}`] }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./HeaderCategories.ts" />

<style lang="sass">
@import 'HeaderCategories'
</style>
