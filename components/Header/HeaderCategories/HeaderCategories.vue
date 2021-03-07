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
        <div class="categories__nav">
          <nuxt-link
            class="category category--root"
            :to="localePath('/models/all')"
          >
            {{ $t('navigation.modelsAll') }}
            <font-awesome-icon icon="angle-double-left" />
          </nuxt-link>
          <a
            v-for="item in rootCategories"
            :key="item.id"
            class="category category--root"
            href="#"
            @click.prevent="setActiveTab(item.slug)"
          >
            {{ item[`title_${$i18n.locale}`] }}
            <font-awesome-icon icon="angle-double-left" />
          </a>
        </div>
        <div class="categories__tabs">
          <div
            v-for="item in rootCategories"
            v-show="active === item.slug"
            :key="item.id"
            class="category__tab"
          >
            <nuxt-link
              class="category category--nested"
              :to="localePath(`/models/${item.slug}`)"
            >
              {{ $t('navigation.modelsAll') }}
            </nuxt-link>
            <nuxt-link
              v-for="nestedItem in getNestedCategories(item)"
              :key="nestedItem.id"
              class="category category--nested"
              :to="localePath(`/models/${nestedItem.slug}`)"
            >
              <img
                class="category__icon"
                :src="`/icons/${nestedItem.icon}.png`"
              >
              {{ nestedItem[`title_${$i18n.locale}`] }}
              <p class="category__description">
                {{ nestedItem[`description_${$i18n.locale}`] }}
              </p>
            </nuxt-link>
          </div>
        </div>
        <!--
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
                :src="`/icons/${nestedItem.icon}.png`"
              >
              {{ nestedItem[`title_${$i18n.locale}`] }}
            </nuxt-link>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./HeaderCategories.ts" />

<style lang="sass">
@import 'HeaderCategories'
</style>
