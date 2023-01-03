<template>
  <div class="header__categories">
    <v-button
      color="primary"
      :title="$t('navigation.modelsCatalog')"
      @click="toggle"
    >
      <span>{{ $t('navigation.modelsCatalog') }}</span>
      <font-awesome-icon icon="bars" style="min-width: 0.875rem; flex: 0 0 0.875rem" />
    </v-button>
    <div
      class="categories"
      :class="toggled ? 'categories--active' : ''"
    >
      <div class="categories__fade" />
      <div class="categories__container">
        <div class="categories__nav">
          <a
            class="category category--root"
            :href="localePath('/models/')"
            @click.prevent="navigate('/models/')"
          >
            {{ $t('navigation.modelsAll') }}
            <font-awesome-icon icon="angle-double-right" />
          </a>
          <a
            v-for="item in rootCategories"
            :key="item.id"
            class="category category--root"
            :class="{ 'category--root-active': active === item.slug }"
            :href="localePath(`/models/${item.slug}`)"
            @click.prevent="setActiveTab(item.slug)"
          >
            {{ item.title }}
            <font-awesome-icon icon="angle-double-right" />
          </a>
        </div>
        <div class="categories__tabs">
          <div
            v-for="category in rootCategories"
            v-show="active === category.slug"
            :key="category.id"
            class="category__tab"
          >
            <div
              v-if="category.description"
              class="tab__description"
            >
              {{ category.description }}
            </div>
            <div class="tab__grid">
              <a
                class="category category--nested"
                :href="localePath(`/models/${category.slug}`)"
                @click.prevent="navigate(`/models/${category.slug}`)"
              >
                <div class="category__top">
                  {{ $t('navigation.modelsAll') }}
                </div>
              </a>
              <a
                v-for="children in category.childrens"
                :key="children.id"
                class="category category--nested"
                :href="localePath(`/models/${children.slug}`)"
                @click.prevent="navigate(`/models/${children.slug}`)"
              >
                <div class="category__top">
                  <img
                    class="category__icon"
                    :src="`/icons/${children.icon}.png`"
                    loading="lazy"
                  >
                  {{ children.title }}
                </div>
                <p
                  v-if="children.description"
                  class="category__description"
                >
                  {{ children.description }}
                </p>
              </a>
            </div>
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
