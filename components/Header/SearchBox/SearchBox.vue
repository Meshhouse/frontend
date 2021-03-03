<template>
  <div class="search-box">
    <font-awesome-icon class="search-box__icon" icon="search" />
    <input
      v-model="search"
      v-debounce:500ms="onInputSubmit"
      class="search-box__input"
      type="text"
      :placeholder="$t('search-box__placeholder')"
      @focus="onInputFocus"
      @blur="onInputBlur"
      @keypress="onKeypress"
    >
    <div
      class="search-box__results"
      :class="isResultsVisible ? 'is-visible' : ''"
    >
      <model-card
        v-for="model in results"
        :key="model._id"
        :item="model"
        row
      />
      <nuxt-link
        class="result result--link"
        :to="localePath(`/models/all?search=${search}`)"
      >
        {{ $t('search-box__link', { query: search }) }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" src="./SearchBox.ts" />

<i18n>
{
  "en": {
    "search-box__placeholder": "Search...",
    "search-box__link": "Show all results for \"{query}\""
  },
  "ru": {
    "search-box__placeholder": "Поиск...",
    "search-box__link": "Показать все результаты для \"{query}\""
  }
}
</i18n>

<style lang="sass">
@import 'SearchBox'
</style>
